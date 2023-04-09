const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Connect = require("./config/Connect");
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
const analyticsRoutes = require("./routes/analytics.routes")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/analytics", analyticsRoutes)

Connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
  });
});
