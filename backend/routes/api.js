const express = require('express');
const router = express.Router();
var loginController = require('./../controller/LoginController')
const LoginValidatation = require('./../validations/login');

// User authentication
router.post('/signup', LoginValidatation.signUpRules, loginController.signup);
router.post('/login', LoginValidatation.loginRules, loginController.login);


// Export router globally accessible
module.exports = router;