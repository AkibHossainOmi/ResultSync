const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/', subjectController.addSubject);
router.get('/', subjectController.getAllSubjects);
router.delete('/:subjectCode', subjectController.deleteSubject);
router.put('/:subjectCode', subjectController.editSubject);

module.exports = router;