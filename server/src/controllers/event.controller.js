const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../helper/event.helper');
const { uploadToCloudinary } = require('../utils/cloud.utils');
const { sendNotification } = require('../utils/notify');
const getIo = require('../utils/getIo');
const emitSocketEvent = require('../utils/socketEmitter');


exports.getAllEvents = asyncHandler(async (req, res, next) => {
    const result = await eventService.getAllEvents(req.query);

    res.status(200).json({
        status: 'success',
        results: result.events.length,
        pagination: result.pagination,
        events: result.events,
    });
});


exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.getEventById(req.params.id);

    res.status(200).json({
        status: 'success',
        event
    });
});


exports.createEvent = asyncHandler(async (req, res, next) => {

    let imageData = null;
    const attachments = [];

    if (req.files?.image?.length) {
        imageData = await uploadToCloudinary(req.files.image[0].buffer, 'event_planner/images');
    }

    if (req.files?.attachments?.length) {
        for (const file of req.files.attachments) {
            const uploaded = await uploadToCloudinary(file.buffer, 'event_planner/attachments');
            attachments.push(uploaded);
        }
    }

    const event = await eventService.createEvent({
        ...req.body,
        attachments,
        image: imageData,
    }, req.user._id);

    const io = getIo(req)


    await sendNotification(req.user._id, {
        title: "Event Created",
        message: `Your event "${event.title}" has been successfully created.`,
        type: "success",
        event: event._id,
    }, io);


    res.status(201).json({
        status: 'success',
        data: {
            event,
        },
    });
});


exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.user._id.toString(),
        req.user.role
    );

    const participants = updatedEvent.participants.map(p => p.user);
    const io = getIo(req);

    participants.forEach(async (userId) => {
        await sendNotification(userId, {
            title: "Event Updated",
            message: `Event "${updatedEvent.title}" has new updates.`,
            type: "info",
            event: updatedEvent._id,
        });
        const payload = { event: event.title }
        emitSocketEvent(io, userId, "event:update", payload)
    });

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});


exports.deleteEvent = asyncHandler(async (req, res, next) => {
    await eventService.deleteEvent(
        req.params.id,
        req.user._id.toString(),
        req.user.role
    );

    // Emit socket event for event deletion
    if (req.app.get('io')) {
        req.app.get('io').emit('event:deleted', { eventId: req.params.id });
    }

    res.status(204).json({
        status: 'success',
        message: "deleted event succefully",
    });
});


exports.joinEvent = asyncHandler(async (req, res, next) => {
    const { event, user } = await eventService.addParticipant(
        req.params.id,
        req.user._id.toString()
    );


    // Send notification to organizer
    await sendNotification(event.organizer, {
        title: "New Participant Joined",
        message: `${req.user.name} joined your event "${event.title}".`,
        type: "success",
        event: event._id,
    });

    const io = getIo(req)

    if (io) {
        const payload = { user, eventName: event.title }
        emitSocketEvent(io, event?.organizer?._id?.toString(), "event:participant-joined", payload)
    }


    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});


exports.leaveEvent = asyncHandler(async (req, res, next) => {
    const { event, removedUser } = await eventService.removeParticipant(
        req.params.id,
        req.user._id.toString()
    );

    await sendNotification(event.organizer, {
        title: "A Participant Leaved",
        message: `${req.user.name} Leaved your event "${event.title}".`,
        type: "warning",
        event: event._id,
    });

    const io = getIo(req)
    if (io) {
        const payload = { user: removedUser, eventName: event.title }
        emitSocketEvent(io, event?.organizer?._id?.toString(), "event:participant-left", payload)
    }

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});


exports.getMyEvents = asyncHandler(async (req, res, next) => {
    const events = await eventService.getUserEvents(
        req.user._id.toString(),
        req.user.role || 'participant'
    );

    res.status(200).json({
        status: 'success',
        results: events.length,
        data: {
            events,
        },
    });
});

