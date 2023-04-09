const express=require("express")

const { postUser, getUser, editUser, deleteUser } = require("../controllers/user.controller")

const app=express.Router()

app.post("/", postUser)

app.get("/:id", getUser)

app.put("/:id", editUser)

app.delete("/:id", deleteUser)





module.exports=app

