const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ecosyncinfo@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (email, token) => {
  return new Promise((resolve, reject) => {
    const loginUrl = `${process.env.FRONTEND_URL}/auth?token=${token}`;
    const filePath = path.join(__dirname, 'emailTemplate.html');
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const mailOptions = {
      from: 'ecosyncinfo@gmail.com',
      to: email,
      subject: 'ResultSync Login Link',
      html: htmlContent.replace('{{loginUrl}}', loginUrl)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject('Error sending login token email');
      } else {
        console.log('Login token email sent:', info.response);
        resolve();
      }
    });
  });
};

const validateJWT = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject('Token is required');
    }

    jwt.verify(token, 'resultsync_secret', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return reject('Token is expired');
        }
        return reject('Invalid token');
      }
      resolve(decoded);
    });
  });
};

module.exports = { sendEmail, validateJWT };
