const jwt = require('jsonwebtoken');
const auth = require('../services/authService');

const initiateLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if(email.endsWith('@diit.edu.bd')||email.endsWith('@diit.info'))
    {
      const token = jwt.sign({ email }, 'resultsync_secret', { expiresIn: '5m' });

      res.status(200).json({ message: 'Login link sent. Please check your email.' });

      auth.sendEmail(email, token)
        .then(() => console.log('Email sent successfully to:', email))
        .catch(error => console.error('Error sending email:', error)); 
    }
    else
    {
      return res.status(400).json({ message: 'Invalid email domain' });
    }
  } catch (error) {
    console.error('Error initiating login:', error);
    res.status(500).json({ message: 'Internal server error' });
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

module.exports = { initiateLogin, validateJWT };
