const nodemailer = require("nodemailer");
const eventTempletes = require("./eventTempletes");


const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

exports.sendMail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

exports.sendWelcomeEmail = async (user) => {
  return exports.sendMail({
    to: user.email,
    subject: "Welcome to Event Planner 🎉",
    html: eventTempletes.welcome({ user }),
  });
};

exports.sendEventCreatedEmail = async ({ user, event, organizer }) => {
  return exports.sendMail({
    to: user.email,
    subject: "A New Event Has Been Created!",
    html: eventTempletes.eventCreated({ event, organizer }),
  });
};

exports.sendEventUpdatedEmail = async ({ user, event }) => {
  return exports.sendMail({
    to: user.email,
    subject: "Event Updated",
    html: eventTempletes.eventUpdated({ event }),
  });
};

exports.sendDailyDigestMail = async ({ user, events }) => {
  return exports.sendMail({
    to: user.email,
    subject: "Events for Tomorrow",
    html: eventTempletes.dailyDigest({ user, events }),
  });
};

exports.sendEventReminderMail = async ({ user, event }) => {
  return exports.sendMail({
    to: user.email,
    subject: "Your event starts in 1 hour",
    html: eventTempletes.eventReminder({ event, user }),
  });
};
