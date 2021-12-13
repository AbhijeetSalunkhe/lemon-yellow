const {body} = require('express-validator');
const User = require('./../models/user');

exports.signUpRules = [
    body('firstName')
    .notEmpty().withMessage('Please enter first name')
    .alpha().withMessage('Only accept alphabetic characters'),
    body('lastName')
    .notEmpty().withMessage('Please enter last name')
    .alpha().withMessage('Only accept alphabetic characters'),
    body('mobile')
    .notEmpty().withMessage('Please enter mobile no')
    .isLength({min : 10}).withMessage('Please enter valid mobile number'),
    body('role_id')
    .notEmpty().withMessage('Please select role'),
    body('email')
    .notEmpty().withMessage('Please enter email')
    .isEmail().withMessage('please enter valid email')
    .custom(value => {
        return User.findOne({where : {email : value}})
            .then(user => {
               if(user) {
                    throw new Error('This email already exist');
               }
            });
    }),
    body('password')
    .notEmpty().withMessage('Please enter password')
];

exports.loginRules = [
    body('email')
    .notEmpty().withMessage('Please enter email')
    .isEmail().withMessage('Please enter valid email'),
    body('password')
    .notEmpty().withMessage('Please enter password')
];