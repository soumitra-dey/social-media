const userModel = require("../models/user.model");
const postModel = require("../models/post.model")

const postUser = async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(400).send("You are a registered user");
    } else {
      let new_user = await userModel.create({
        name,
        email,
        bio,
        created_at: new Date().getTime(),
        updated_at: 0,
      });
      res.status(200).send(new_user);
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await userModel.findById(id);
    if (!user) {
      res.status(400).send("You are not a registered user");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const editUser = async (req, res) => {
    const { id } = req.params;
    const {name, bio} = req.body
    try {
      await userModel.findByIdAndUpdate(id,{name,bio, updated_at:new Date().getTime()})
      let user = await userModel.findById(id)
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      let user = await userModel.findByIdAndDelete(id)
      await postModel.deleteMany({user_id:id})
      res.status(200).send("User Deleted");
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
};




module.exports = {
  postUser,
  getUser,
  editUser,
  deleteUser
};
