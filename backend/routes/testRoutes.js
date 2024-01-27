const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');

router.route('/')
    .get(testsController.getAllTests)
    .post(testsController.createTest)
    .put(testsController.updateTest)
    .delete(testsController.deleteTest);

router.route('/:id')
    .get(testsController.getTestByOwnerId);

module.exports = router;