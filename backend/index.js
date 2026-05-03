const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const registermodel = require("./registermodel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const userrightmodel = require("./userrights")
const app = express()
const createnewcustomer =  require("./createnewmodel")
dotenv.config()
app.use(cors())


app.use(express.json())





app.post("/register",async(req,res)=>{
try {
    const {name , phone , password} =  req.body 
    if(!name ||  !phone || !password){
return res.status(400).json({success:false , message:"all fields are required"})
    }

    const checkphoneexist =await registermodel.findOne({phone})
    if(checkphoneexist){
      return  res.status(400).json({success:false , message:"phone already exist"})
    }

    const registerdata = new registermodel({name , phone , password})

    await registerdata.save()

    res.status(200).json({success:true , message:"data submitted"})
} catch (error) {
    console.error(error)
    res.status(500).json({success:false , message:"internal server  error in backend"})
    
}
})

app.post("/login",async(req,res)=>{
    try {
        const {phone , password} = req.body

        if(!phone || !password){
            return res.status(400).json({success:false , message:"all fields are required"})
        }
        const phoneexist = await registermodel.findOne({phone})
         
        const check = await registermodel.findOne({phone , password})
    
         

if(!phoneexist){
    return res.status(400).json({success:false , message:"phone # is not registered"})

}

if(!check){
    return res.status(400).json({success:false , message:"password is not correct"})

}

        if(check){
     const token = jwt.sign({id:check._id , role:check.role},process.env.JWT_SECRET,{expiresIn:"1d"})
            res.status(200).json({success:true ,token , role:check.role ,  message:"successfully login"})
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"internal server errors"})
    }
})





app.post("/createnewcustomer",async(req,res)=>{
    try {
        const {name , amount , optionmoney , detail} = req.body
        if(!name || !amount || !optionmoney || !detail){
            return res.status(400).json({success:false , message:"all fields are required"})
        }

const checknameexist =await createnewcustomer.findOne({name})


if(checknameexist){
  checknameexist.explaination.push({amount , optionmoney , detail})
        await checknameexist.save()


           return res.status(200).json({
        success: true,
        message: "Data added to existing customer"
    });

}

else{
const data =new createnewcustomer({name , explaination:[{
    amount , optionmoney , detail}
]})
        await data.save()
}

        

        res.status(200).json({success:true , message:"successfully submitted"})

    } catch (error) {
        console.error(error)
        res.status(500).json({success:false , message:"internal server error"})
        
    }
})


app.get("/getdata",async(req,res)=>{
    try {
        const data =await createnewcustomer.find()
        res.status(200).json({success:true, data , message:"done"})
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false , message:"internal server error"})
    }
})








app.post("/userright",async(req,res)=>{
    try {
        const {role , allowedpage} = req.body

        if(!role){
            return res.status(400).json({success:false , message:"please select role"})
        }

         if(!allowedpage){
            return res.status(400).json({success:false , message:"please select add page"})
        }

         const checkroleandallowedpageexist =await userrightmodel.findOne({role , allowedpage})
        if(checkroleandallowedpageexist){
            return res.status(400).json({success:false , message:"already exist"})
        }

        const checkroleexist =await userrightmodel.findOne({role})

        if(!checkroleexist){
            const data =  userrightmodel({role,allowedpage})
            await data.save()
            res.status(200).json({success:true , message:"successfully submitted"})
        }

        if(checkroleexist){
            checkroleexist.allowedpage.push(allowedpage)
           await checkroleexist.save()
            res.status(200).json({success:true , message:"successfully submitted"})

        }

       
        

        
    } catch (error) {

        console.log(error)
     res.status(500).json({success:false, message: "Internal server error"})
        
    }
})

app.post("/ProtectedRoute",async(req,res)=>{
    try {
        const {allowedpage} = req.body;

        if(!allowedpage){
            return res.status(400).json({success:false , message:"allowedpage is not found"})
        }

  const checkexistallowedpage = await userrightmodel.find({
  allowedpage: allowedpage
});


        if(!checkexistallowedpage){
            return res.status(400).json({success:false , message:"allowedpage is incorrect"})
        }

        const role = checkexistallowedpage.map((r)=>r.role)

        if(checkexistallowedpage){
return res.status(200).json({success:true , role , message:"done"  })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false , message:"internal server error in protected routes"})
        
    }
})
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected via Direct Node! ✅");
})
.catch(err => {
    console.log("Still getting error ❌:", err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("server started")
})


module.exports = app;