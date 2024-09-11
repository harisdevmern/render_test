const mongoose = require("mongoose");
const Joi = require("joi");
const { ServerDescription } = require("mongodb");
const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  duration: Number,
  description: String,
  fee:Number,
  credits:Number
});
module.exports = mongoose.model("Course", courseSchema);