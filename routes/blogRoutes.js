const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blog.model.js");


//get all blogs
router.get("/get-all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send({ count: blogs.length, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch blogs" });
  }
});
//get single blog
router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findById(id);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch blog" });
  }
});

//updating a blog

router.put("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await Blog.findByIdAndUpdate(id, data, {
      returnOriginal: false,
    });
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update blog" });
  }
});

//creating blog
router.post("/create-blog", async (req, res) => {
  const data = req.body;

  try {
    const blog = new Blog(data);
    const response = await blog.save();
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to create blog" });
  }
});

//delete Blog
router.delete("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findByIdAndDelete(id);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update blog" });
  }
});

module.exports = router;