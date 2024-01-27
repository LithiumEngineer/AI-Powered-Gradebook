const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.route('/')
    .get(studentsController.getAllStudents)
    .post(studentsController.createStudent)
    .put(studentsController.updateStudent)
    .delete(studentsController.deleteStudent);

router.route('/:id')
    .get(studentsController.getStudentByTeacherId);

module.exports = router;