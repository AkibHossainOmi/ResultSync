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
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

