const Subject = require('../models/subjectModel');

exports.addSubject = async (req, res) => {
  const { subjectCode, subjectName, semester, added_by } = req.body;

  try {
    await Subject.insertSubject(subjectCode, subjectName, semester, added_by);
    res.status(201).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Duplicate subject code' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
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

exports.deleteSubject = async (req, res) => {
  const subjectCode = req.params.subjectCode;

  try {
    await Subject.deleteBySubjectCode(subjectCode);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(400).json({ error: 'Delete information of a subject used in result is forbidden' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.editSubject = async (req, res) => {
  const oldSubjectCode = req.params.subjectCode;
  const { newSubjectCode, subjectName, semester } = req.body;

  try {
    await Subject.updateBySubjectCode(oldSubjectCode, newSubjectCode, subjectName, semester);
    res.status(200).json({ message: 'Subject updated successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Duplicate subject code' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
