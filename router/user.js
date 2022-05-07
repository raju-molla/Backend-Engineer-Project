const express = require('express')
const router = express.Router();
const Auth = require('../middlware/auth')
const permission = require('../middlware/permission')
const Uploader = require('../middlware/fileUpload')
const { register, logIn, assignment, sumbitAssessment, gradeUpdate, mentorsAllSubmission, getAll } = require('../controller/userController');

router.post("/register",register);
router.post("/login",logIn);
router.post("/assignment",Auth,permission(['mentor']),assignment);
router.post("/submission/:id",Auth,permission(['student']),Uploader.single('link'),sumbitAssessment)
router.put('/gradeUpdate/:id',Auth,permission(['mentor']),gradeUpdate);
router.get('/mentor-all-submission',Auth,mentorsAllSubmission);
router.get('/get-all',Auth,permission(['admin']),getAll);


module.exports = router