const Event = require('../models/Event.model');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../utils/cloud.utils');
const { updateById, findById, createDoc } = require('../utils/db.utils');


exports.getAllEvents = async (queryParams) => {
    const { status, search, page = 1, limit = 2, sortBy = '-startTime', category } = queryParams;

    const query = {};

    if (status && status !== 'all') {
        query.status = status;
    }

    if (category && category !== 'all') {
        query.category = category;
    }

    if (search) {
        query.$text = { $search: search };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const events = await Event.find(query)
        .populate('organizer', 'name email avatar')
        .populate('participants.user', 'name email avatar')
        .sort(sortBy)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    return {
        events,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
        },
    };
};


exports.getEventById = async (id) => {
    const event = await Event.findById(id)
        .populate('organizer', 'name email avatar')
        .populate('participants.user', 'name email avatar');

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return event;
};


exports.createEvent = async (eventData, userId) => {
    console.log(eventData, 'event data')
    const event = await createDoc(Event, {
        ...eventData,
        organizer: userId,
        participants: [{ user: userId, status: "joined", joinedAt: new Date() }],
    })

    console.log(event)

    return event.populate('organizer', 'name email avatar');
};

exports.updateEvent = async (id, updateData, userId, userRole) => {
    let event = await findById(Event, id)

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    // Check permissions
    if (userRole !== 'admin' && event.organizer.toString() !== userId) {
        throw new AppError('You do not have permission to update this event', 403);
    }

    event = await updateById(Event, id, updateData)


    return event.populate('organizer', 'name email avatar');
};

exports.deleteEvent = async (id, userId, userRole) => {
    const event = await Event.findById(id);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    if (event.attachments && event.attachments.length > 0) {
        for (const file of event.attachments) {
            await deleteFromCloudinary(event.public_id)
        }
    }

    if (event.image.public_id) {
        await deleteFromCloudinary(event.image.public_id)
    }

    await event.deleteOne();
    return { message: 'Event deleted successfully' };
};

exports.addParticipant = async (eventId, userId) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    if (event.participants.some((p) => p.user.toString() === userId)) {
        throw new AppError('User is already a participant', 400);
    }

    const participant = {
        user: userId,
        status: "joined",
        joinedAt: new Date()
    }
    event.participants.push(participant);
    await event.save();

    const joinedUser = await User.findById(userId).select('name email avatar');

    await event.populate([
        { path: 'participants.user', select: 'name email avatar' },
        { path: 'organizer', select: 'name email avatar' }
    ]);

    return { event, user: joinedUser };

};


exports.removeParticipant = async (eventId, userId) => {
    const event = await Event.findById(eventId)
        .populate('participants.user', 'name email avatar')
        .populate('organizer', 'name email');

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    const removedUser = event.participants.find(
        (p) => p.user._id.toString() === userId
    )?.user;

    event.participants = event.participants.filter(
        (p) => p.user._id.toString() !== userId
    );

    await event.save();


    return {
        event: await event.populate('participants.user', 'name email avatar'),
        removedUser,
    };
};

exports.getUserEvents = async (userId, role) => {
    const query = role === 'organizer'
        ? { organizer: userId }
        : { participants: userId };

    return Event.find(query)
        .populate('organizer', 'name email avatar')
        .sort('-startTime');
};

exports.getEventsForReminders = async () => {
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
    const now = new Date();

    return Event.find({
        startTime: { $gte: now, $lte: oneHourFromNow },
        reminderSent: false,
        status: 'upcoming',
    }).populate('organizer participants', 'name email');
};