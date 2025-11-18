const express = require('express');
const eventController = require('../controllers/event.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validateEvent, validateFiles } = require('../middlewares/validate.middleware');
const upload = require('../middlewares/upload.middleware');
const router = express.Router();

router.use(protect);

router.get('/my-events', eventController.getMyEvents);
router
    .route('/')
    .get(eventController.getAllEvents)
    .post(
        restrictTo('admin', 'organizer'),
        upload,
        validateFiles,
        validateEvent,
        eventController.createEvent
    );

router
    .route('/:id')
    .get(eventController.getEvent)
    .patch(
        restrictTo('admin', 'organizer'),
        upload,
        validateEvent,
        eventController.updateEvent
    )
    .delete(restrictTo('admin', 'organizer'), eventController.deleteEvent);

router.post('/:id/join', eventController.joinEvent);
router.post('/:id/leave', eventController.leaveEvent);

module.exports = router;