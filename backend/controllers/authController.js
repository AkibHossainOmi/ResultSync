const jwt = require('jsonwebtoken');
const auth = require('../services/authService');
const Faculty = require('../models/facultyModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExists = await Faculty.checkEmailExists(email);
    if (!emailExists) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const faculty = await Faculty.getByEmail(email);
    const hashedPassword = faculty.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const token = jwt.sign({ email: email }, 'resultsync_secret', { expiresIn: '5m' });

    res.json({ token: token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const initateRegister = async (req, res) => {
  try {
    const { email } = req.body;

    const emailExists = await Faculty.checkEmailExists(email);
    if (emailExists) {
      return res.status(403).json({ message: 'Email already exists.' });
    }

    if (email.endsWith('@diit.edu.bd') || email.endsWith('@diit.info')) {
      const token = jwt.sign({ email }, 'resultsync_secret', { expiresIn: '5m' });
      res.status(200).json({ message: 'Email verification link sent. Please check your email.' });
      try {
        await auth.sendEmail(email, token, 0);
        console.log('Email sent successfully to:', email);
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email.' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid email domain' });
    }
  } catch (error) {
    console.error('Error initiating register:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const initiateReset = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExists = await Faculty.checkEmailExists(email);
    if (!emailExists) {
      return res.status(404).json({ message: "Email doesn't exist." });
    }
    else {
      const token = jwt.sign({ email }, 'resultsync_secret', { expiresIn: '5m' });
      res.status(200).json({ message: 'Password reset link sent. Please check your email.' });

      try {
        await auth.sendEmail(email, token, 1);
        console.log('Email sent successfully to:', email);
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email.' });
      }
    }
  } catch (error) {
    console.error('Error initiating register:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const validateJWT = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = await auth.validateJWT(token);
    return res.status(200).json({ success: true, message: 'Token is valid', decoded });
  } catch (error) {
    return res.status(200).json({ success: false, message: error });
  }
};

const setPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const emailExists = await Faculty.checkEmailExists(email);

    if (emailExists) {
      
      await Faculty.setPassword(email, password);
      res.status(200).json({ success: true, message: 'Password updated successfully' });
    } else {
      
      await Faculty.setPassword(email, password);
      res.status(201).json({ success: true, message: 'Faculty registered successfully' });
    }
  } catch (error) {
    console.error('Error setting/updating password:', error);
    res.status(500).json({ success: false, message: 'Failed to set/update password' });
  }
};

module.exports = { login, initateRegister, initiateReset, validateJWT, setPassword };
