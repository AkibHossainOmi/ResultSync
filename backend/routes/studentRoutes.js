const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.addStudent);
router.get('/', studentController.getAllStudents);
router.delete('/:registrationNo', studentController.deleteStudent);
router.put('/:registrationNo', studentController.updateStudent);

module.exports = router;