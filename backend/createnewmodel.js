const mongoose = require("mongoose")

const farig =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },

    explaination:[{
           amount:{
        type:String,
        required:true
    },
    optionmoney:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        
    }
 } ]
 
})


const createnewcustomermodel = new mongoose.model("createnewcustomer",farig)
module.exports = createnewcustomermodel