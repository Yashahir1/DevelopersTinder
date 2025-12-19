const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      photoURL,
      age,
      about,
      skills,
      gender,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      photoURL,
      age,
      about,
      skills,
      gender,
    });
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send("Error while creating the user : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //creating a jwt token
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (err) {
    res.status(400).send("Error while loggin in : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  //first logic to logout user by clearing cookie
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  //second logic to logout user by clearing cookie
  // res.clearCookie("token");
  res.send("Logout Successful");
});

module.exports = authRouter;
