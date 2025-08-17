require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes/blogRoutes.js");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/", router);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("success wass done!!");
});

//new
app.get("/api/users/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("username email");
  res.json(user);
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log(`server was listening at ${PORT}`);
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server was listening at ${PORT}`);
});
