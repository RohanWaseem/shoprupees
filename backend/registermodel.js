const mongoose = require("mongoose")

const farig = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }

})


const registermodel = new mongoose.model("register",farig)
module.exports = registermodel