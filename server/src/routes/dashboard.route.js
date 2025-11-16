const express = require('express')
const { protect, restrictTo } = require('../middlewares/auth.middleware')
const dashboardController = require('../controllers/dashboard.controller')
const router = express.Router();

router.use(protect)

router.get('/admin', restrictTo('admin'), dashboardController.getAdminDashaboard)
router.get('/organizer', restrictTo('organizer'), dashboardController.getOrganizerDashboard)


module.exports = router

