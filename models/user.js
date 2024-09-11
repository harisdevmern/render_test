const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
  },
  email: String,
  password: String,
  rollNo: Number,
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().lowercase().min(3).max(10).messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must be at most 10 characters long.",
      "string.lowercase": "Name must be in lowercase.",
      "any.required": "Name is a required field.",
    }),

    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is a required field.",
    }),

    password: Joi.string().required().messages({
      "string.base": "Password must be a string.",
      "any.required": "Password is a required field.",
    }),

    rollNo: Joi.number().required().messages({
      "number.base": "Roll number must be a number.",
      "any.required": "Roll number is a required field.",
    }),
  });
  return schema.validate(user);
};
module.exports = {
  User: mongoose.model("User", userSchema),
  validate: validateUser,
};
// module.exports = mongoose.model("User", userSchema);
