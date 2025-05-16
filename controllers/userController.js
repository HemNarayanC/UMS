const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../config/dbConnection');

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
