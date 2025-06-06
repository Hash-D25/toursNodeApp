const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // secure: true, // true for 465, false for other ports
    // If you are using Gmail and port 587, set secure to false and requireTLS to true
    // If you are using Gmail and port 465, set secure to true
    secure: process.env.EMAIL_PORT == 465,
    requireTLS: process.env.EMAIL_PORT == 587,
  });
  //2) Define the email options
  const mailOptions = {
    from: `Natours <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // Uncomment if you want to send HTML emails
  };
  //3) Actually send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.log('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
