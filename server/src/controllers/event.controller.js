const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../services/event.service');
const { uploadToCloudinary } = require('../utils/cloudinary');

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


    console.log(event, "event doc ")

    // Emit socket event for new event
    if (req.app.get('io')) {
        req.app.get('io').emit('event:created', {
            event,
            organizer: req.user,
        });
    }

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

    // Emit socket event for event update
    if (req.app.get('io')) {
        req.app.get('io').to(`event:${event._id}`).emit('event:updated', event);
    }

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
        data: { message: 'deleted event succefully' },
    });
});

/**
 * @desc    Join event (add participant)
 * @route   POST /api/events/:id/join
 * @access  Private
 */
exports.joinEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.addParticipant(
        req.params.id,
        req.user._id.toString()
    );

    // Emit socket event
    if (req.app.get('io')) {
        req.app.get('io').to(`event:${event._id}`).emit('participant:joined', {
            event,
            user: req.user,
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
 * @desc    Leave event (remove participant)
 * @route   POST /api/events/:id/leave
 * @access  Private
 */
exports.leaveEvent = asyncHandler(async (req, res, next) => {
    const event = await eventService.removeParticipant(
        req.params.id,
        req.user._id.toString()
    );

    // Emit socket event
    if (req.app.get('io')) {
        req.app.get('io').to(`event:${event._id}`).emit('participant:left', {
            event,
            userId: req.user._id,
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