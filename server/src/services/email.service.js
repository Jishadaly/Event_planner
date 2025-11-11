const nodemailer = require('nodemailer');


const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};


const sendEmail = async (options) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};


//Send welcome email
const sendWelcomeEmail = async (user) => {
  await sendEmail({
    to: user.email,
    subject: 'Welcome to Event Planner!',
    html: `
      <h1>Welcome ${user.name}!</h1>
      <p>Thank you for joining Event Planner. ${user.role === 'organizer' ? 'Start creating and managing your events today' : 'Discover and join exciting events today'}!</p>
      <a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a>
    `,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail
};