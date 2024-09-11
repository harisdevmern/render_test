const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/login", async (req, res) => {
  //destructuring
  const { email, password } = req.body;
  //JOI:if ivalid body run error
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result.error);
    return res.status(400).send("invalid formate of request");
  }

  try {
    //to match the email is exist or not
    const user = await User.findOne({ email }); //=>({email: email})
    if (!user) {
      //it is necessary to return,....
      return res.send("Incorrect email or password");
    }
    const isValidPassword = await bcrypt.compare(password, user.password); //e.g: (123, fhjhrueyrfhe834y)
    //.................................user enter pssword, Hash password in db
    console.log(isValidPassword);
    if (isValidPassword) {
      //create a token
      // send the token to the client
      //must give identifire to jwt
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET
      );
      //send Token to the user
      return res.status(200).send(token);
    }
    return res.status(400).send("Incorrect email or password");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
