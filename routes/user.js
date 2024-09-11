const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
//get all user......,async
router.get("/", auth, async (req, res) => {
  // if (req.query) {
  //   const users = await User.find({ rollNo: { $eq: req.query.rollNo } });
  //   // .limit(2)
  //   // .skip(1)
  //   // .select("name rollNo -_id");
  //   console.log(users);
  //   res.send(users);
  // }
  try {
    const users = await User.find();
    console.log(users);
    res.send(users);
  } catch (e) {
    console.log("error fetching user", e);
  }
});

//get a user with a specific id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return res.send(user);
  } catch (e) {
    console.log("error fetching user", id, e);
  }
});
// router.get("/user/:id/:name", (req, res) => {
//   console.log(req.params.id, req.params.name);
//   res.json({
//     id: req.params.id,
//     name: req.params.name,
//   });
// });

//user
//signUp
router.post("/", async (req, res) => {
  const user = req.body;

  //validaton

  // to check if user already exist in db or not
  const dbUser = await User.findOne({ email: user.email });
  if (dbUser) {
    return res.send("User already exists");
  }
  const salt = await bcrypt.genSalt();
  console.log("salt", salt);

  user.password = await bcrypt.hash(user.password, salt);

  const newUser = new User(user);
  console.log(newUser);
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
    // await newUser.save();
  } catch (e) {
    console.log("error catching", e);
    res.send(e);
  }
});
router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      console.log(user);
    } else {
      console.log("user not found");
    }
  } catch (e) {
    console.log(e);
  }

  res.send("hello put");
});
router.patch("/", (req, res) => {
  res.send("hello patch");
});
router.delete("/", async (req, res) => {
  // const deletedUser=await
  res.send("hello delete");
});
module.exports = router;
