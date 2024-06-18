const Student = require('../models/studentModel');

exports.addStudent = async (req, res) => {
  const { name, regNo, added_by } = req.body;

  try {
    await Student.insertStudent(name, regNo, added_by);
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Duplicate registration number' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    await Student.deleteByRegistrationNo(registrationNo);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(400).json({ error: 'Delete information of a student having result is forbidden' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { name, newRegistrationNo } = req.body;
    await Student.updateByRegistrationNo(registrationNo, { name, registrationNo: newRegistrationNo });
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Duplicate registration number' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
