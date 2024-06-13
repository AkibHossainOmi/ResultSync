const Subject = require('../models/subjectModel');

exports.addSubject = async (req, res) => {
  const { subjectCode, subjectName, semester } = req.body;

  try {
    await Subject.insertSubject(subjectCode, subjectName, semester);
    res.status(201).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
