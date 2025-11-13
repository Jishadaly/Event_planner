const Event = require('../models/Event.model');
const AppError = require('../utils/AppError');
const { updateById, findById, createDoc } = require('../utils/db.utils');

/**
 * Get all events with filters and pagination
 */
exports.getAllEvents = async (queryParams) => {
    const { status, search, page = 1, limit = 10, sortBy = '-startTime', category } = queryParams;
    console.log(queryParams)
    // Build query
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
        .populate('participants', 'name email avatar')
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

/**
 * Get single event by ID
 */
exports.getEventById = async (id) => {
    const event = await Event.findById(id)
        .populate('organizer', 'name email avatar')
        .populate('participants', 'name email avatar');

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return event;
};

/**
 * Create new event
 */
exports.createEvent = async (eventData, userId) => {
    console.log(eventData, 'event data')
    const event = await createDoc(Event, {
        ...eventData,
        organizer: userId,
        participants: [userId],
    })

    console.log(event)

    return event.populate('organizer', 'name email avatar');
};

/**
 * Update event
 */
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

/**
 * Delete event
 */
exports.deleteEvent = async (id, userId, userRole) => {
    const event = await Event.findById(id);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    // Check permissions
    if (userRole !== 'admin' && event.organizer.toString() !== userId) {
        throw new AppError('You do not have permission to delete this event', 403);
    }

    await event.deleteOne();
    return { message: 'Event deleted successfully' };
};

/**
 * Add participant to event
 */
exports.addParticipant = async (eventId, userId) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    if (event.participants.includes(userId)) {
        throw new AppError('User is already a participant', 400);
    }

    event.participants.push(userId);
    await event.save();

    return event.populate('participants', 'name email avatar');
};

/**
 * Remove participant from event
 */
exports.removeParticipant = async (eventId, userId) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    event.participants = event.participants.filter(
        (p) => p.toString() !== userId
    );
    await event.save();

    return event.populate('participants', 'name email avatar');
};

/**
 * Get events by user (as organizer or participant)
 */
exports.getUserEvents = async (userId, role) => {
    const query = role === 'organizer'
        ? { organizer: userId }
        : { participants: userId };

    return Event.find(query)
        .populate('organizer', 'name email avatar')
        .sort('-startTime');
};

/**
 * Get upcoming events that need reminders
 */
exports.getEventsForReminders = async () => {
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
    const now = new Date();

    return Event.find({
        startTime: { $gte: now, $lte: oneHourFromNow },
        reminderSent: false,
        status: 'upcoming',
    }).populate('organizer participants', 'name email');
};