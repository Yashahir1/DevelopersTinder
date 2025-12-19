const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/" , profileRouter);
app.use("/" , requestsRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(4488, () => console.log("Server running on port 4488."));
  })
  .catch((err) => {
    console.log(err);
  });


//get feed api - get all the users from database.
// app.get("/user", async (req, res) => {
//   const userEmailid = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmailid });
//     if (users.length === 0) {
//       return res.status(400).send("No users found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Error while fetching the users" + err.message);
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       return res.status(400).send("No users found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Error while fetching the users" + err.message);
//   }
// });

// app.get("/findoneuser", async (req, res) => {
//   try {
//     const users = await User.findOne({ emailId: req.body.emailId });
//     if (users.length === 0) {
//       return res.status(400).send("No users found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Error while fetching the users" + err.message);
//   }
// });

// app.delete("/deleteUser", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     console.log("Received body:", req.body);

//     if (!userId) {
//       return res.status(400).send("userId is required");
//     }

//     const user = await User.findByIdAndDelete(userId);

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     res.send("User Deleted Successfully");
//   } catch (err) {
//     res.status(400).send("Error while deleting user: " + err.message);
//   }
// });

// app.patch("/updateUser/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const data = req.body;
//   console.log(data);
//   try {
//     const ALLOWEDUPDATES = [
//       "userId",
//       "gender",
//       "age",
//       "photoURL",
//       "about",
//       "skills",
//     ];
//     const isValidOperation = Object.keys(data).every((update) =>
//       ALLOWEDUPDATES.includes(update)
//     );
//     if (!isValidOperation) {
//       throw new Error("Invalid update");
//     }
//     if (data.skills.length > 5) {
//       throw new Error("Maximum 5 skills allowed");
//     }
//     await User.findByIdAndUpdate(userId, data, {
//       new: true,
//       runValidators: true,
//     });
//     res.send("User Updated Successfully");
//   } catch (err) {
//     res.status(400).send("Error while updating the user : " + err.message);
//   }
// });