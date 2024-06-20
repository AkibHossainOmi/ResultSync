const Result = require('../models/resultModel');

exports.postResults = async (req, res) => {
  const results = req.body;

  try {
    await Result.insertResults(results);
    res.status(201).json({ message: 'Results posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getResults = async (req, res) => {
  const { registrationNo, semester } = req.query;

  try {
    const results = await Result.getResults(registrationNo, semester);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Results not published' });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateResult = async (req, res) => {
  const { reg_no, subject_code, marks } = req.body;

  try {
    await Result.updateResult(reg_no, subject_code, marks);
    res.status(200).json({ message: 'Result updated successfully' });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteResult = async (req, res) => {
  const { reg_no, subject_code } = req.query;

  try {
    await Result.deleteResult(reg_no, subject_code);
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};