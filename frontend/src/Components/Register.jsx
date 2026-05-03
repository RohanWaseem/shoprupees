import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [name , setName] = useState("")
    const [phone , setPhone] =useState("")
    const [password , setPassword] =  useState("")

const navigate = useNavigate();

    const handleregister =async(e)=>{
        e.preventDefault()

        try {

            const res = await fetch("http://localhost:5000/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name , phone , password})
            })

            const data = await res.json()
            if(res.ok){
                alert("successfully submitted")
                navigate("/")
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

        <div className='bg-white w-120 rounded-2xl h-90 flex justify-center'>
      
      <form action="" onSubmit={handleregister} className='mt-10'>
      <h1 className='font-bold text-xl'>Name:</h1>
      <input type="text" placeholder='enter name ' className='border border-gray-500 rounded-xl pl-4 w-100 mt-1 h-8' value={name}  onChange={(e)=>setName(e.target.value)} />
      <h1 className='font-bold text-xl mt-2'>Phone #:</h1>
      <input type="text" placeholder='enter phone no ' className='border border-gray-500 rounded-xl pl-4 w-100 mt-1 h-8' value={phone}  onChange={(e)=>setPhone(e.target.value)} />
      <h1 className='font-bold text-xl mt-2'>Password:</h1>
      <input type="password" placeholder='enter password' className='border border-gray-500 rounded-xl pl-4 w-100 mt-1 h-8' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
      <button className='bg-blue-600 text-white mt-4 text-xl w-100 h-10' type='submit'>Register</button>

<div className='flex justify-center mt-2'>
       <h1>Already have an Account? <Link to="/"><span className='text-blue-600 font-bold'>Login</span></Link></h1></div>
      </form>

      </div>
    </div>
  )
}

export default Register
