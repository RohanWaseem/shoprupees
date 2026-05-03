const mongoose = require("mongoose")

const farig = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },

    allowedpage:{
       type:[String],
       default:[]
    }
})


const userrightmodel =  mongoose.model ("userright",farig)
module.exports = userrightmodel