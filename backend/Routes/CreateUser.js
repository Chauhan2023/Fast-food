const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "invaild Please full the mess")
    .isString()
    .trim()
    .isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });

      // Log the newly created user for debugging purposes
      console.log("New user created:", req.body.name);

      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);

      // Send the error message in the response for debugging purposes
      res.json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
