const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.initateRegister);
router.post('/reset', authController.initiateReset);
router.get('/:token', authController.validateJWT);
router.post('/password', authController.setPassword);  
router.post('/login', authController.login);  

module.exports = router;