const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes/blogRoutes.js");
require("dotenv").config();
const app = express();

const PORT = 5000;






app.use(cors());
app.use(express.json());
app.use('/',router)

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("success wass done!!");
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
