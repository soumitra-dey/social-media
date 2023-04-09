const express = require("express");

const app = express.Router();

const {
  addPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post.controller");

app.post("/", addPost);


app.get("/:id", getPost)

app.put("/:id", updatePost)

app.delete("/:id", deletePost)

app.post("/:id/like", likePost)

app.post("/:id/unlike", unlikePost)

module.exports = app;
