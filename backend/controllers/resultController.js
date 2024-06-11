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
