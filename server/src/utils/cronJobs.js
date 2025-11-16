const cron = require("node-cron");
const Event = require("../models/Event.model");
const {
  sendDailyDigestMail,
  sendEventReminderMail,
} = require("../services/email/email.service");


cron.schedule("*/5 * * * *", async () => {
  console.log("CRON! Checking events for upcoming reminders...");

  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

  const events = await Event.find({
    startTime: { $gte: now, $lte: oneHourFromNow },
    reminderSent: false,
  }).populate("participants.user");

  for (const event of events) {
    for (const p of event.participants) {
      await sendEventReminderMail({
        user: p.user,
        event: event,
      });
    }

    event.reminderSent = true;
    await event.save();
    console.log(`Reminder sent for: ${event.title}`);
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("CRON! Sending daily digest...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfDay = new Date(tomorrow.setHours(0, 0, 0));
  const endOfDay = new Date(tomorrow.setHours(23, 59, 59));

  const events = await Event.find({
    startTime: { $gte: startOfDay, $lte: endOfDay },
  }).populate("participants.user");

  // GROUP EVENTS BY USER
  const userEventsMap = {};

  for (const event of events) {
    for (const p of event.participants) {
      const userId = p.user._id.toString();

      if (!userEventsMap[userId]) {
        userEventsMap[userId] = {
          user: p.user,
          events: [],
        };
      }

      userEventsMap[userId].events.push(event);
    }
  }

  // SEND ONE EMAIL PER USER
  for (const userId in userEventsMap) {
    const { user, events } = userEventsMap[userId];

    await sendDailyDigestMail({
      user,
      events,
    });
  }

  console.log("Daily digest sent.");
});
