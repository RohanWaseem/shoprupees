import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'


const Login = () => {


  const navigate = useNavigate()
      const [phone , setPhone] = useState("")
        const [password , setPassword] =  useState("")
    
    
        const handlelogin =async(e)=>{
            e.preventDefault()
            try {
              const res = await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({phone , password})
              })
              const data =await res.json()
              if(res.ok){
              
                localStorage.setItem("token" , data.token)
                localStorage.setItem("role" , data.role)
                if(data.role === "user"){
navigate("/unautorize")}
else{
  navigate("/dashboard")
}
                alert("data submitted")

              }
              else{
                alert(data.message)
              }
            } catch (error) {
              console.error(error)
              alert("internal server error ")
            }
    
        }
  return (
       <div className=' bg-linear-to-r from-blue-600 to-blue-900 h-screen items-center flex justify-center'>

        <div className='bg-white w-120 rounded-2xl h-80 flex justify-center'>
      
      <form action="" onSubmit={handlelogin} className='mt-10'>
      <h1 className='font-bold text-xl'>Phone #:</h1>
      <input type="text" placeholder='enter phone no ' className='border border-gray-500 rounded-xl pl-4 w-100 mt-1 h-8' value={phone}  onChange={(e)=>setPhone(e.target.value)} />
      <h1 className='font-bold text-xl mt-2'>Password:</h1>
      <input type="password" placeholder='enter password' className='border border-gray-500 rounded-xl pl-4 w-100 mt-1 h-8' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
      <button className='bg-blue-600 text-white mt-4 text-xl w-100 h-10' type='submit'>Login</button>

<div className='flex justify-center mt-2'>
       <h1>Don't have an Account? <Link to="/register"><span className='text-blue-600 font-bold'>Register</span></Link></h1></div>
      </form>

      </div>
    </div>
  )
}

export default Login
