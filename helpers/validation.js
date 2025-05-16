const {check} = require('express-validator');

exports.signUpValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().normalizeEmail({gmail_remove_dots: true }),
    check('password', 'Password is required').isLength(6),
]