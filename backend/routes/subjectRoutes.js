const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/', subjectController.addSubject);
router.get('/', subjectController.getAllSubjects);

module.exports = router;