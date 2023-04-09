const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const getallUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const getallPost = async (req, res) => {
  try {
    const posts = await postModel.find({}).populate("user_id");
    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const topUser = async (req, res) => {
  try {
    const users = await postModel.aggregate([
      { $group: { _id: "$user_id", count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $lookup: { from:"socialusers",localField:"_id",foreignField:"_id",as:"users_details" }}
    ]);
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const topPost = async (req, res) => {
    try {
      const posts = await postModel.find({}).sort({"likes":-1}).populate("user_id")
      res.status(200).send(posts);
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  };

module.exports = { getallUser, getallPost, topUser, topPost };
