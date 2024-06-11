const Student = require('../models/studentModel');

exports.addStudent = async (req, res) => {
  const { name, regNo } = req.body;

  try {
    await Student.insertStudent(name, regNo);
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
