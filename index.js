require("dotenv").config();
const express = require("express");
const app = express(); //initialize the express
const mongoose = require("mongoose");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth.js");
const courseRouter = require("./routes/course");

app.use(express.json());
// app.use((req,res, next)=>{
//   console.log("hello middleware");
//   next()
// })
const connectionString = process.env.MONGO_DB_URL;
mongoose
  .connect(connectionString, {
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  })
  .then(() => {
    console.log("connect to data base");
  })
  .catch((e) => {
    console.log("not connect", e);
  });

app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  //this is call back function
  console.log("listening on port", process.env.PORT);
});
