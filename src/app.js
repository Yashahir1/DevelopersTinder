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