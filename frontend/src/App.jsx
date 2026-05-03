
import React from 'react'
import {BrowserRouter , Routes ,Route}  from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import Addsubamount from './Components/addsubamount'
import Userrights from './Components/Userrights'
import Unauthorize from './Components/Unauthorize'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {

  return (
    <div>
          <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<ProtectedRoute allowedpage = {"dashboard"}><Dashboard/></ProtectedRoute>}/>
            <Route path="/addsubamount" element={<ProtectedRoute allowedpage= {"addsubamount"}><Addsubamount/></ProtectedRoute>}/>
            <Route path="/userrights" element={<ProtectedRoute allowedpage = {"userrights"}> <Userrights/> </ProtectedRoute>}/>
            <Route path="/unautorize" element={<Unauthorize/>}/>




            {/* <Route path="/userrights" element={ <Userrights/>}/> */}





          </Routes>
          </BrowserRouter>
          
    </div>
  )
}

export default App
