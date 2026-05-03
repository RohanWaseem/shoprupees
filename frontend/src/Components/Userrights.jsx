import React from 'react'
import { useState } from 'react'

const Userrights = () => {
    const [role , setRole] = useState("")


    const handlerole =async(allowedpage)=>{
try {
    const res = await fetch("http://localhost:5000/userright",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({role , allowedpage})
    })

    const data = await res.json()
    if(res.ok){
        alert("data submitted")
    }
    else{
        alert(data.message)
    }
} catch (error) {
    console.error(error)
    alert("internal server error in frontend")
}


    }

  return (
    <>
    <div>
      <h1 className='text-3xl font-bold'> Select Role</h1>
      <select name="" id="" className='w-90 border  h-12 text-xl ml-30 mt-2' value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="" className='hidden'>choose option</option>
        <option value="ahmad">Ahmad</option>
        <option value="khizar">Khizar</option>
        <option value="rohan">Rohan</option>
        <option value="papa">Papa</option>
      </select>
    </div>



<div className='mt-5 flex justify-center'>
    <table className='border'>
        <tr className='border h-12'>
            <th className='border w-60'>page name </th>
            <th className='border w-30' >Add</th>
        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>dashboard</td>
           <td className='border w-30 text-center' onClick={()=>handlerole("dashboard")}>Add</td>


        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>Addsubamount</td>
            <td className='border w-30 text-center' onClick={()=>handlerole("addsubamount")}>Add</td>
        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>userRights</td>
            <td className='border w-30 text-center' onClick={()=>handlerole("userrights")} >Add</td>
        </tr>
        
    </table>
</div>


<div className='mt-15 flex justify-center'>
    <table className='border'>
        <tr className='border h-12'>
            <th className='border w-60'>page name </th>
            <th className='border w-30'>Remove</th>
        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>dashboard</td>
           <td className='border w-30 text-center'>Remove</td>


        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>Addsubamount</td>
            <td className='border w-30 text-center'>Remove</td>
        </tr>
        <tr className='border h-12'>
            <td className='border w-60 text-center'>userRights</td>
            <td className='border w-30 text-center'>Remove</td>
        </tr>
        
    </table>
</div>

    </>



  )
}

export default Userrights
