const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype === "image/jpeg" ||
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpg"
    ? cb(null, true)
    : cb(new Error("Invalid file type"), false);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

const { signUpValidation } = require("../helpers/validation");

const userController = require("../controllers/userController");
router.post(
  "/register",
  upload.single("image"),
  signUpValidation,
  userController.register
);

module.exports = router;
