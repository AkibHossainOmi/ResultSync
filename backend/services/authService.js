const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Faculty = require('../models/facultyModel');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, token, emailType) => {
  try {
      if(emailType == 0)
      {
        const emailExists = await Faculty.checkEmailExists(email);
        if (emailExists) {
          return Promise.reject('Email already exists');
        }
        const subject = "ResultSync email verification link.";
        const verifyUrl = `${process.env.FRONTEND_URL}/auth?token=${token}`;
        const filePath = path.join(__dirname, 'verifyEmail.html');
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: subject,
          html: htmlContent.replace('{{verifyUrl}}', verifyUrl)
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              reject('Error sending email verification link');
            } else {
              console.log('Email verification link sent:', info.response);
              resolve();
            }
          });
        });
      }
      else
      {
        const subject = "ResultSync password reset link.";
        const resetUrl = `${process.env.FRONTEND_URL}/auth?token=${token}`;
        const filePath = path.join(__dirname, 'passwordReset.html');
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: subject,
          html: htmlContent.replace('{{resetUrl}}', resetUrl)
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              reject('Error sending email verification link');
            } else {
              console.log('Email verification link sent:', info.response);
              resolve();
            }
          });
        });
      }
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    return Promise.reject('Error processing email request');
  }
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
