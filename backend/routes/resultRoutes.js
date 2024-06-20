const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.postResults);
router.get('/', resultController.getResults);
router.put('/', resultController.updateResult);
router.delete('/', resultController.deleteResult);

module.exports = router;