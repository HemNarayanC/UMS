const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../config/dbConnection');

const randomstring = require('randomstring')
const sendMail = require('../helpers/sendMail')

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user already exists
  db.query(
    `SELECT * FROM users WHERE email = LOWER(${db.escape(req.body.email)})`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Hash password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Error hashing password",
            error: err,
          });
        }

        // Insert user into DB
        db.query(
          `INSERT INTO users (name, email, password) VALUES (${db.escape(
            req.body.name
          )}, ${db.escape(req.body.email)}, ${db.escape(hash)})`,
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Error inserting user",
                error: err,
              });
            }

            let mailSubject = 'Mail Verification';
            const randomToken = randomstring.generate();
            let content = '<p>Hello, '+req.body.name+', \ please <a href = "http://localhost:5000/mail-verification?token='+randomToken+'"> verify</a> your email address</p>'

            sendMail(req.body.email, mailSubject, content);

            db.query('UPDATE users set token = ? where email = ?', [randomToken, req.body.email, function(error, result, field){
                if(error){
                    return res.status(500).json({
                        msg: err
                    })
                }
            }])

            return res.status(201).json({
              message: "User registered successfully",
              user: {
                id: result.id,
                name: req.body.name,
                email: req.body.email,
              },
            });
          }
        );
      });
    }
  );
};

module.exports = {
  register,
};
