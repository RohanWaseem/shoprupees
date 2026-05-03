import React, { useState , useEffect } from 'react'
import Menu from "../assets/menu.png"
import Cross from "../assets/cross.png"
import axios from "axios"


const Dashboard = () => {
  const [menu , setMenu] = useState(false)
const [getdatas , setGetdatas] =  useState([])


  const handlemenu =()=>{
setMenu(true)
  }

  const total =Number(215000)

  const grandTotal = getdatas.reduce((total, item) => {
  const customerTotal = item.explaination.reduce((acc, curr) => {
    if (curr.optionmoney === "submit") {
      return acc + Number(curr.amount);
    } else if (curr.optionmoney === "withdraw") {
      return acc - Number(curr.amount);
    }
    return acc;
  }, 0);

  return total + customerTotal;
}, 0);

  const axiosdata =async()=>{
try {
    await axios.get("http://localhost:5000/getdata")
    .then((res)=>setGetdatas(res.data.data))
    .catch((err)=>console.error(err))
} catch (error) {
    console.error(error)
    alert("internal server error")
}
}

useEffect(()=>{
axiosdata()
},[])




  return (
    <div className='bg-linear-to-br from-amber-200  h-screen to-yellow-100 flex justify-center'>

        <div className=' '>


<div className='flex justify-between'>
  <div></div>
  <div></div>
  <div>
    <img src={Menu} className='w-20' alt="" onClick={handlemenu} />
  </div>

</div>


      {menu && (

<div className="relative  ">
    <div className="w-150 h-107 bg-white border-5 left-165 top-6  absolute">

        <div className="flex justify-between">
            <div>

            </div>

            <div>

            </div>

            <div>
                <h1 className=" w-10"><img src={Cross} alt=""  onClick={()=>setMenu(false)}/></h1>
            </div>

        </div>

<div className="flex justify-center   ">
    <div>

  <div className='bg-amber-200 flex justify-center items-center w-147.5 h-25'>
<div className='flex gap-10  '>
<h1 className='text-4xl font-bold'>Total:</h1>
<h1 className='w-40 text-4xl font-bold text-center'>
  {total}
</h1>
</div></div>


  <div className='bg--400 flex justify-center items-center w-147.5 h-25'>
<div className='flex gap-10  '>
<h1 className='text-4xl font-bold'>Cash On Hand:</h1>
<h1 className=' w-40 text-4xl font-bold text-center'>{total + grandTotal}</h1></div></div>


  <div className='bg-amber-200 flex justify-center items-center w-147.5 h-25'>
<div className='flex gap-10  '>
<h1 className='text-4xl font-bold'>Expense:</h1>
<h1 className=' w-40 text-4xl font-bold text-center'>{grandTotal}</h1></div></div>

{/* 
  <div className='bg--400 flex justify-center items-center w-147.5 h-25'>
<div className='flex gap-10  '>
<h1 className='text-4xl font-bold'>Extra Cash On Hand:</h1>
<h1 className=' w-40 text-4xl font-bold text-center'></h1></div></div> */}


        

   
        </div>
</div>
  

    </div>
</div>
    
)
}


        <div className="pt-3 ">

         

         
        <table className="border w-screen mt-5  ">
          <tr className="border-3 bg-red-500 text-white border-black text-xl  ">
            <th className="border w-80">Name</th>
            <th className="border">Detail</th>
            <th className="border w-80">Total</th>
          
          </tr>
          <br />

          {getdatas.length > 0 ? (
           
            getdatas.map((item)=>(
        
  <tr className="border h-25 bg-white " key={item._id}>
            <td className="border text-center text-xl">{item.name}</td>
 <td className="flex gap-5 justify-center  w-[800px] overflow-x-auto   pl-2" >
            {item.explaination.slice(-5).map((r , i)=>(

            //   <div className=` ${}border   ` key={i}>
              <div className={r.optionmoney === "withdraw"? "bg-red-700  text-white rounded-xl p-2 min-w-20 max-h-20 ": "  text-white rounded-xl p-2 min-w-20 max-h-20 bg-green-500"}      key={i}>

                <h1 className="text-center font-medium">{r.amount}</h1>

                <h1 className="text-xs text-center">4-12-2024</h1>

                <h1 className="text-xs text-center text-wrap overflow-hidden ">
                  {r.detail}
                </h1>
              </div>
            ))}
            </td>

          <td className="border text-center text-xl font-bold">
  {item.explaination.reduce((acc, curr) => {
    if (curr.optionmoney === "submit") {
      return acc + Number(curr.amount);
    } else if (curr.optionmoney === "withdraw") {
      return acc - Number(curr.amount);
    }
    return acc;
  }, 0)}

</td>
       
          </tr>
            ))
          ):(
            <h1>no data found</h1>
          )}


        
        
        </table>
      </div>

   

      </div>
    </div>
  )
}

export default Dashboard
