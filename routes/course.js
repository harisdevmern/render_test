const express = require("express");
const Course = require("../models/course");
const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});
//post Courses
router.post("/courses", async (req, res) => {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    console.log("Validation Error:", error);
    return res.status(400).send("Invalid course data");
  }

  const { code, name, duration, description, fee, credits } = req.body;

  try {
    const course = new Course({
      code,
      name,
      duration,
      description,
      fee,
      credits,
    });

    // Save the course to the database
    const savedCourse = await course.save();
    res.status(201).send(savedCourse);
  } catch (e) {
    console.log("Error creating course:", e);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
