const {check} = require('express-validator');

exports.signUpValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().normalizeEmail({gmail_remove_dots: true }),
    check('password', 'Password is required').isLength(6),
    check('image').custom((value, {req})=>{

        if(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png'){
            return true;
        }
        else{
            return false;
        }

    }).withMessage('Please upload an image with type png, jpg'),
]