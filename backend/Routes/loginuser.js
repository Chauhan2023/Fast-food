const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtsecret = "mynameisrohit@2001";

router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "invaild Please fullfill")
    .isString()
    .trim()
    .isLength({ min: 5 }),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      let userData = await User.findOne({ email });
     
      
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Login with correct id details" });
      }

      const compassword =await bcrypt.compare(req.body.password, userData.password);


      if (!compassword) {
        return res.status(400).json({ errors: "Login with correct id detail" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtsecret);
      
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
