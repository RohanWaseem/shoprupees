import React, { useState } from "react";
import Cross from "../assets/cross.png"
import axios from "axios"
import { useEffect } from "react";
import Menu from "../assets/menu.png"


const addsubamount = () => {
const [handlesubmit , setHandlesubmit] = useState(false)
const [withdrawmoney , setWithdrawmoney] =  useState(false)
const [create, setCreate]=useState(false)
const [name , setName] = useState("")
const [amount , setAmount] =  useState("")
const [optionmoney , setOptionmoney] = useState("")
const [detail , setDetail] = useState("")
const [getdatas , setGetdatas] =  useState([])
const [submitamount , setSubmitamount] = useState("")
const [submitdetail , setSubmitdetail] = useState("")
const [page , setPage] = useState(false)
const [withdrawamount , setWithdrawamount] = useState("")
const [withdrawdetail , setWithdrawdetail] =  useState("")
  const [menu , setMenu] = useState(false)



// working  



const handlemenu =()=>{
setMenu(true)
  }


const handlecrosswithdraw =()=>{
    setWithdrawmoney(false)

    localStorage.clear()
}



  const total =Number(215000)

  const grandTotal = getdatas.reduce((total, item) => {
  const customerTotal = (item.explaination || []).reduce((acc, curr) => {
    if (curr.optionmoney === "submit") {
      return acc + Number(curr.amount);
    } else if (curr.optionmoney === "withdraw") {
      return acc - Number(curr.amount);
    }
    return acc;
  }, 0);

  return total + customerTotal;
}, 0);

     const hadlewithdrawdata=async(e)=>{
            e.preventDefault()
try {

            const name = localStorage.getItem("withdrawname")
            const moneyoption = localStorage.getItem("withdrawmoneyoption")

    const res = await fetch("http://localhost:5000/createnewcustomer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name ,amount: withdrawamount , optionmoney:moneyoption , detail:withdrawdetail})
    })


    const data = await res.json()
    if(res.ok){
          setWithdrawamount("")
        setWithdrawdetail("")
       
    setWithdrawmoney(false)
    axiosdata()
        
        alert("successfully submitted")
      

    }else{
        alert(data.message)
    }
} catch (error) {
    console.log(error)
    alert("internal server error")
}
        }



        // working 

const handlesubmitbutton =()=>{
    setHandlesubmit(false)
    localStorage.removeItem("submitname")
    localStorage.removeItem("submitmoneyoption")

}

const handlecross=()=>{
    setCreate(false)
}

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


const handlesubmitmoney =(name , moneyoption)=>{

        setHandlesubmit(true)

        localStorage.setItem("submitname" , name)
        localStorage.setItem("submitmoneyoption" , moneyoption)


       
    }


     const handlesubmitdata=async(e)=>{
            e.preventDefault()
try {

            const name = localStorage.getItem("submitname")
            const moneyoption = localStorage.getItem("submitmoneyoption")

    const res = await fetch("http://localhost:5000/createnewcustomer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name ,amount: submitamount , optionmoney:moneyoption , detail:submitdetail})
    })


    const data = await res.json()
    if(res.ok){
          setSubmitamount("")
        setSubmitdetail("")
       
        setHandlesubmit(false)
        axiosdata()
        alert("successfully submitted")
      

    }else{
        alert(data.message)
    }
} catch (error) {
    console.log(error)
    alert("internal server error")
}
        }

const handlecreatenew =()=>{
setCreate(true)
}


    const handlewithdrawmoney =(name , moneyoption)=>{
setWithdrawmoney(true)

 localStorage.setItem("withdrawname" , name)
        localStorage.setItem("withdrawmoneyoption" , moneyoption)

    }

    const handlesubmits =async(e)=>{
e.preventDefault()
try {
    const res = await fetch("http://localhost:5000/createnewcustomer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name , amount , optionmoney , detail})
    })

    const data = await res.json()
    if(res.ok){
          setName("")
        setAmount("")
        setDetail("")
        setOptionmoney("")

        setCreate(false)
        axiosdata()
        alert("successfully submitted")
      

    }else{
        alert(data.message)
    }
} catch (error) {
    console.log(error)
    alert("internal server error")
}
    }
  return (
    <div className="bg-linear-to-br from-amber-200  h-screen to-yellow-100 flex justify-center">

<div className='flex justify-between'>
  <div></div>
  <div></div>
<div className="flex justify-end p-3">
  <img 
    src={Menu} 
    className="w-10 cursor-pointer" 
    alt="menu"
    onClick={handlemenu} 
  />
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

{/* create new customer */}
       {create && (

<div className="relative  ">
    <div className="w-150 h-180 bg-white border-5 left-165 top-26  absolute">

        <div className="flex justify-between">
            <div>

            </div>

            <div>

            </div>

            <div>
                {/* <h1 className=" w-10"><img src={Cross} alt=""  onClick={handlecross}/></h1> */}
            </div>

        </div>

<div className="flex justify-center   ">
    <div>
        <button className="w-80 ml-20 bg-blue-600 text-white mt-5 h-13 text-xl">Create New Customer</button>
<form onSubmit={handlesubmits}>
  <h1 className="text-2xl font-bold mt-15">Name:</h1>
        <input type="text" placeholder="enter name" className="border h-10 text-xl pl-3 w-120" value={name}  onChange={(e)=>setName(e.target.value)} />

        <h1 className="text-2xl font-bold mt-10">Amount:</h1>
        <input type="text" placeholder="enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border h-10 text-xl pl-3 w-120"/>

        <h1 className="text-2xl font-bold mt-10">Option:</h1>

        <select  className="w-120 border h-10" value={optionmoney} onChange={(e)=>setOptionmoney(e.target.value)}>
            <option value="" disabled className="hidden">Choose Option</option>
            <option value="submit">Money Submitted</option>
            <option value="withdraw">Money Withdraw</option>

        </select>
        

        <h1 className="text-2xl font-bold mt-3">Detail:</h1>
        <input type="text" placeholder="enter detail" value={detail} onChange={(e)=>setDetail(e.target.value)} className="border h-10 text-xl pl-3 w-120" /><br />


        <button className="w-120 bg-gray-300 mt-5 h-13 text-xl" type="submit">Submitted</button>
        </form>
        </div>
</div>
  

    </div>
</div>
    
)
}

{/* create new customer */}

      
      
        {withdrawmoney && (

<div className="relative  ">
    <div className="w-150 h-120 bg-white border-5 left-165 top-45  absolute">

        <div className="flex justify-between">
            <div>

            </div>

            <div>

            </div>

            <div>
                <h1 className=" w-10"><img src={Cross} alt=""  onClick={handlecrosswithdraw}/></h1>
            </div>

        </div>

<div className="flex justify-center   ">
    <div>
        <button className="w-80 ml-20 bg-red-600 text-white mt-5 h-13 text-xl">Amount Withdraw</button>

<form action="" onSubmit={hadlewithdrawdata}>
        <h1 className="text-2xl font-bold mt-15">Amount:</h1>
        <input type="text" placeholder="enter amount" value={withdrawamount} onChange={(e)=>setWithdrawamount(e.target.value)} className="border h-10 text-xl pl-3 w-120"/>

        <h1 className="text-2xl font-bold mt-3">Detail:</h1>
        <input type="text" placeholder="enter detail" value={withdrawdetail} onChange={(e)=>setWithdrawdetail(e.target.value)} className="border h-10 text-xl pl-3 w-120" /><br />


        <button className="w-120 bg-gray-300 mt-5 h-13 text-xl" type="submit">Withdraw</button>
        </form>
        </div>
</div>
  

    </div>
</div>
    
)
}
      


      {handlesubmit && (

<div className="relative  ">
    <div className="w-150 h-120 bg-white border-5 left-165 top-45  absolute">

        <div className="flex justify-between">
            <div>

            </div>

            <div>

            </div>

            <div>
                <h1 className=" w-10"><img src={Cross} alt=""  onClick={handlesubmitbutton}/></h1>
            </div>

        </div>

<div className="flex justify-center   ">
    <div>
        <button className="w-80 ml-20 bg-green-600 mt-5 h-13 text-xl">Amount Submit</button>

<form action="" onSubmit={handlesubmitdata} >
        <h1 className="text-2xl font-bold mt-15"  >Amount:</h1>
        <input type="text" placeholder="enter amount" value={submitamount} onChange={(e)=>setSubmitamount(e.target.value)} className="border h-10 text-xl pl-3 w-120"/>

        <h1 className="text-2xl font-bold mt-3">Detail:</h1>
        <input type="text" placeholder="enter detail" value={submitdetail} onChange={(e)=>setSubmitdetail(e.target.value)} className="border h-10 text-xl pl-3 w-120" /><br />


        <button className="w-120 bg-gray-300 mt-5 h-13 text-xl" type="submit">Submit</button>
        </form>
        </div>
</div>
  

    </div>
</div>
    
)
}
      
      
      <div className="pt-3 ">

          <div>
            <button className="bg-blue-500 border-1  rounded w-15 h-10 pb-4 ml-3   text-3xl" onClick={handlecreatenew}>+ </button>
        </div>

         
        <table className="border w-screen mt-5  ">
          <tr className="border-3 bg-red-500 text-white border-black text-xl  ">
            <th className="border w-80">Name</th>
            <th className="border">Detail</th>
            <th className="border w-80">Total</th>
            <th className="border pl-5 pr-5">Money submit (+)</th>

            <th className="border pl-5 pr-5 ">Money Withdraw (-)</th>
          </tr>
          <br />

   {getdatas.length > 0 ? (
  getdatas.map((item) => (
    <tr className="border h-25 bg-white" key={item._id}>
      <td className="border text-center text-xl">{item.name}</td>

      {/* horizontal scrollable area for transactions */}
      <td className="flex gap-5 justify-center w-[800px] overflow-x-auto pl-2">
        {item.explaination.slice(-5).map((r, i) => (
          <div
            key={i}
            className={`${
              r.optionmoney === "withdraw" ? "bg-red-700" : "bg-green-500"
            } text-white rounded-xl p-2 min-w-20 max-h-20`}
          >
            <h1 className="text-center font-medium">{r.amount}</h1>
            <h1 className="text-xs text-center">4-12-2024</h1>
            <h1 className="text-xs text-center text-wrap overflow-hidden">
              {r.detail}
            </h1>
          </div>
        ))}
      </td>

      {/* Calculation for Total Balance */}
      <td className="border text-center text-xl font-bold">
        {item.explaination.reduce((acc, curr) => {
          const amount = Number(curr.amount) || 0;
          return curr.optionmoney === "submit" ? acc + amount : acc - amount;
        }, 0)}
      </td>

      {/* Action Buttons */}
      <td 
        className="border text-center text-xl font-bold cursor-pointer hover:bg-gray-100" 
        onClick={() => handlesubmitmoney(item.name, "submit")}
      >
        Submit
      </td>

      <td 
        className="border text-center text-xl font-bold cursor-pointer hover:bg-gray-100" 
        onClick={() => handlewithdrawmoney(item.name, "withdraw")}
      >
        Withdraw
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className="text-center py-4">No data found</td>
  </tr>
)}
        
        
        </table>
      </div>











    </div>
  );
};

export default addsubamount;
