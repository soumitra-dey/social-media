const { Schema, model } = require("mongoose");


const userSchema=new Schema({
    name:{
        type:String,
        minlength:1,
        maxlength:50,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    bio:{
        type:String,
        maxlength:200
    },
    created_at:{
        type:Number
    },
    updated_at:{
        type:Number
    }
})

const userModel=model("socialuser", userSchema)

module.exports=userModel
