const nodemailer = require("nodemailer");

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,     // smtp.mailtrap.io
    port: process.env.EMAIL_PORT,     // 2525
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

module.exports = {
  createEmailTransporter,
};
