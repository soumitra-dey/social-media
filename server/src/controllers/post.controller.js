const postModel = require("../models/post.model");

const addPost = async (req, res) => {
  const { user_id, content } = req.body;
  try {
    const new_post = await postModel.create({
      user_id,
      content,
      created_at: new Date().getTime(),
      updated_at: 0,
    });
    res.status(200).send(new_post);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id).populate("user_id");
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    await postModel.findByIdAndUpdate(id, {
      content,
      updated_at: new Date().getTime(),
    });
    const post = await postModel.findById(id);
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await postModel.findByIdAndDelete(id);
    res.status(200).send("Post deleted");
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  console.log("jhas")
  try {
    const post = await postModel.findById(id);
    await postModel.findByIdAndUpdate(id, { likes: post.likes + 1 });
    res.status(200).send("Liked");
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    if (post.likes == 0) {
      res.status(400).send("The like count should not go below 0");
    } else {
      await postModel.findByIdAndUpdate(id, { likes: post.likes - 1 });
      res.status(200).send("unliked");
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = {
  addPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
