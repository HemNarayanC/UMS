const {validationResult} = require('express-validator')

const register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

     res.status(200).json({
        message: 'User registered successfully',
        user: req.body
    });
}

module.exports = {
    register
}