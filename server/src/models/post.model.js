const { Schema, model, Mongoose } = require("mongoose");


const postSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"socialuser"
    },
    content: { 
        type: String, 
        required: true, 
        maxlength: 300 
    },
    created_at:{
        type:Number
    },
    updated_at:{
        type:Number
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    }
})

const postModel=model("socialpost", postSchema)

module.exports=postModel
