const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read the token from the requuest cookies
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token provided");
    }

    const decodeObj = await jwt.verify(token, "DEV@#$4488");

    const { userId: _id } = decodeObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
