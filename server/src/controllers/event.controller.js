const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../helper/event.helper');
const { uploadToCloudinary } = require('../utils/cloud.utils');
const { sendNotification } = require('../utils/notify');
const getIo = require('../utils/getIo');
const { emitParticipantJoined, emitSocketEvent } = require('../utils/socketEmitter');

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Private
 */
exports.getAllEvents = asyncHandler(async (req, res, next) => {
    const result = await eventService.getAllEvents(req.query);

    res.status(200).json({
        status: 'success',
        results: result.events.length,
        pagination: result.pagination,
        events: result.events,
    });
});

/**
 * @desc    Get single event
 * @route   GET /api/events/:id
 * @access  Private
 */
exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.getEventById(req.params.id);

    res.status(200).json({
        status: 'success',
        event
    });
});

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private (Organizer/Admin)
 */
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

    console.log("FINAL EVENT DATA:", {
        ...req.body,
        organizer: req.user._id,
        attachments,
        image: imageData,
    });

    const event = await eventService.createEvent({
        ...req.body,
        attachments,
        image: imageData,
    }, req.user._id);

    const io = getIo(req)


    await sendNotification(req.user._id, {
        title: "Event Created",
        message: `Your event "${event.title}" has been successfully created.`,
        type: "event-created",
        event: event._id,
    }, io);


    // if (io) {
    //     io.to(req.user._id.toString()).emit("event:created", {
    //         event
    //     }); 
    // }

    res.status(201).json({
        status: 'success',
        data: {
            event,
        },
    });
});

/**
 * @desc    Update event
 * @route   PATCH /api/events/:id
 * @access  Private (Organizer/Admin)
 */
exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.user._id.toString(),
        req.user.role
    );

    const io = req.app.get("io");

    const participants = updatedEvent.participants.map(p => p.user);

    participants.forEach(async (userId) => {
        await sendNotification(userId, {
            title: "Event Updated",
            message: `Event "${updatedEvent.title}" has new updates.`,
            type: "event-updated",
            event: updatedEvent._id,
        }, io);

        io.to(userId.toString()).emit("event:updated", updatedEvent);
    });

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private (Organizer/Admin)
 */
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

/**
 * @desc    Join event (add participant)
 * @route   POST /api/events/:id/join
 * @access  Private
 */
exports.joinEvent = asyncHandler(async (req, res, next) => {
    const { event, user } = await eventService.addParticipant(
        req.params.id,
        req.user._id.toString()
    );

    // Send notification to organizer
    await sendNotification(event.organizer, {
        title: "New Participant Joined",
        message: `${req.user.name} joined your event "${event.title}".`,
        type: "event-join",
        event: event._id,
    });

    const io = getIo(req)

    if (io) {
        const payload = {
            userName: joinedUser.name,
            eventName: event.title,
        }
        emitSocketEvent(io, event.organizer._id.toString(), "event:participant-joined", payload)
    }


    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

/**
 * @desc    Leave event (remove participant)
 * @route   POST /api/events/:id/leave
 * @access  Private
 */
exports.leaveEvent = asyncHandler(async (req, res, next) => {
    const { event, removedUser } = await eventService.removeParticipant(
        req.params.id,
        req.user._id.toString()
    );

    const io = getIo(req)
    if (io) {
        io.to(event.organizer.toString()).emit("event:participant-left", {
            userName: removedUser.name,
            eventName: event.title,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

/**
 * @desc    Get user's events
 * @route   GET /api/events/my-events
 * @access  Private
 */
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

