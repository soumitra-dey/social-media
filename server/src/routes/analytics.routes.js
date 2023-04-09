const express = require("express");

const app = express.Router();

const {
  getallUser,
  getallPost,
  topUser,
  topPost,
} = require("../controllers/analytics.controller");

app.get("/users", getallUser);
app.get("/posts", getallPost);
app.get("/users/top-active", topUser);
app.get("/posts/top-liked", topPost)

module.exports = app;
