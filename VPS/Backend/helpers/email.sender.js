const nodemailer = require('nodemailer');
const configuration = require('../configs/configuration');

const emailSender = async ({ email, subject, html }) => {
  console.log('GMAIL_USER:', process.env.GMAIL_USER);
  console.log('GMAIL_PASS:', process.env.GMAIL_PASS);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: configuration.GMAIL.USER,
      pass: configuration.GMAIL.PASS,
    },
  });
  const message = {
    from: 'DEMO OTP',
    to: email,
    subject,
    html,
  };
  transporter.sendMail(message);
};

module.exports = emailSender;
