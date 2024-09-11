const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  //........................header
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //.................................secretKey must match
    // console.log(verified);
    //if token verified move to the next()....function
    next();
  } catch (e) {
    console.log(e);
  }
};
module.exports = auth;
