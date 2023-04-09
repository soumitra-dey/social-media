const mongoose = require("mongoose");
require("dotenv").config();

const Connect = () => mongoose.connect(process.env.MONGO);

module.exports = Connect;
