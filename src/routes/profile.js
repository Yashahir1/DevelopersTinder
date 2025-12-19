const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error while getting profile : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Fields");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!`,
      UpdatedData: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error while updating the user : " + err.message);
  }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword && !newPassword) {
      return res.status(400).send("New password is required");
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error("Old Password is incorrect");
    }

    if (oldPassword === newPassword) {
      throw new Error("New Password must be different from Old Password");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password is not strong enough");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();
    res.send("Password Reset Successfully");
  } catch (err) {
    res.status(400).send("Error while resetting password : " + err.message);
  }
});

module.exports = profileRouter;
