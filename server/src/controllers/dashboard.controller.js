const asyncHandler = require('../utils/asyncHandler');
const Event = require('../models/Event.model');
const User = require('../models/User.model');
// const { default: mongoose } = require('mongoose');

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


exports.getAdminDashaboard = asyncHandler(async (req, res, next) => {

    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const upcomingEvents = await Event.countDocuments({ status: "upcoming" });
    const ongoingEvents = await Event.countDocuments({ status: "ongoing" });
    const finishedEvents = await Event.countDocuments({ status: "completed" });

    //event by catogory
    const eventByCategory = await Event.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1
            }
        }
    ]);

    //events per month
    const eventsMonthly = await Event.aggregate([
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                events: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                events: 1
            }
        },
        { $sort: { month: 1 } }
    ]);

    const eventsOverTimeData = eventsMonthly.map((m) => ({
        month: monthNames[m.month - 1],
        events: m.events
    }));


    //user per month
    const usersMonthly = await User.aggregate([
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                users: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                users: 1
            }
        },
        { $sort: { month: 1 } }
    ]);

    const usersOverTimeData = usersMonthly.map((m) => ({
        month: monthNames[m.month - 1],
        users: m.users
    }));

    //recent events
    const recentEvents = await Event.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title organizer participants status createdAt")
        .populate({
            path: "organizer",
            select: "name email",
        })
        .lean();

    // Add participant count field
    const formattedRecentEvents = recentEvents.map(ev => ({
        ...ev,
        participantCount: ev.participants?.length || 0,
    }));


    //resend users
    const recentUsers = await User.find({})
        .sort({ createdAt: -1 })
        // .limit(5)
        .select("name email role createdAt")
        .lean();


    res.status(200).json({
        status: "success",
        data: {
            statsData: [
                { title: "Total Events", count: totalEvents },
                { title: "Total Users", count: totalUsers },
                { title: "Upcoming Events", count: upcomingEvents },
                { title: "Ongoing Events", count: ongoingEvents },
            ],

            eventChartData: [
                { name: "Upcoming", value: upcomingEvents },
                { name: "Ongoing", value: ongoingEvents },
                { name: "Finished", value: finishedEvents },
            ],

            eventsOverTimeData,
            usersOverTimeData,
            eventByCategoryData: eventByCategory,
            recentEvents: formattedRecentEvents,
            recentUsers,

        }
    });


})

exports.getOrganizerDashboard = asyncHandler(async (req, res, next) => {

    const organizerId = req.user?._id;
    console.log(organizerId)

    if (!organizerId) {
        return res.status(400).json({ message: "Organizer ID missing" });
    }

    const myEvents = await Event.countDocuments({ organizer: organizerId });

    // 2️⃣ Total participants in all events
    const totalParticipantsAgg = await Event.aggregate([
        { $match: { organizer: organizerId } },
        { $project: { total: { $size: "$participants" } } },
        { $group: { _id: null, totalParticipants: { $sum: "$total" } } }
    ]);

    const totalParticipants = totalParticipantsAgg[0]?.totalParticipants || 0;

    // 3️⃣ Upcoming events
    const upcomingEvents = await Event.countDocuments({
        organizer: organizerId,
        status: "upcoming"
    });

    // 4️⃣ Avg participants per event
    const avgParticipantsPerEvent =
        myEvents > 0 ? Math.round(totalParticipants / myEvents) : 0;

    // 5️⃣ Event-wise participant chart
    const participantsData = await Event.aggregate([
        { $match: { organizer: organizerId } },
        {
            $project: {
                name: "$title",
                participants: { $size: "$participants" }
            }
        }
    ]);

    // 6️⃣ Weekly participant registrations chart
    const attendanceData = await Event.aggregate([
        { $match: { organizer: organizerId } },
        { $unwind: "$participants" },
        {
            $group: {
                _id: { week: { $week: "$participants.joinedAt" } },
                registrations: { $sum: 1 }
            }
        },
        { $sort: { "_id.week": 1 } },
        {
            $project: {
                week: { $concat: ["Week ", { $toString: "$_id.week" }] },
                registrations: 1,
                _id: 0
            }
        }
    ]);

    const myEventsList = await Event.find(
        { organizer: organizerId },
        {
            title: 1,
            date: 1,
            status: 1,
            createdAt: 1,
            participantsCount: { $size: "$participants" }
        }
    ).sort({ createdAt: -1 });

    const statsData = {
        myEvents,
        totalParticipants,
        avgParticipantsPerEvent,
        upcomingEvents,

    }


    return res.status(200).json({
        statsData,
        upcomingEvents,
        participantsData,
        attendanceData,
        myEventsList
    });
});


exports.getParticipantDashboard = asyncHandler(async (req, res, next) => {

    const userId = req.user._id;

    // Fetch events where this user joined/interested
    const myEvents = await Event.find({
        "participants.user": userId,
        "participants.status": { $in: ["joined", "interested"] }
    })
        .select("title startTime endTime category location status participants")
        .sort({ startTime: 1 });

    // Separate upcoming & past events
    const now = new Date();

    const upcomingEvents = myEvents.filter(
        (ev) => ev.status === "upcomming"
    );

    const pastEvents = myEvents.filter(
        (ev) => new Date(ev.endTime) < now
    );

    // Stats
    const stats = {
        totalJoined: myEvents.length,
        upcomingCount: upcomingEvents.length,
        completedCount: pastEvents.length,
    };

    res.status(200).json({
        status: "success",
        data: {
            stats,
            myEvents,
            upcomingEvents,
            pastEvents,
        },
    });

});
