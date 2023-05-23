import React, {  useContext, useState } from 'react'
import {  Alert, Button, Form, Row } from 'react-bootstrap'
import '../adminLogin/admin.css'
import { addData } from '../../context/Contextshare'
import { adminlogin } from '../../api/allapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../adminregister/Loader'
import { useNavigate } from 'react-router-dom'







function AdminLogin() {
  const navigate=useNavigate()
  const [token,settoken]=useState('')
  const [loader,setloader]=useState(false)
  const {useradd,setuseradd}=useContext(addData)
  const [inputdata,setinputdata]=useState({
   email:"",
   
    psw:""
 
})
const setinputvalue=(e)=>{
  
  e.preventDefault();
  const {name,value}=e.target
  setinputdata({...inputdata,[name]:value})


}
console.log(inputdata);



const login=async(e)=>{
// e.preventDefalult()
const {email,psw}=inputdata
if(email===""){
  toast.error("enter your email")
}
else if(psw===""){
  toast.error("enter your password")
}
else{
  const Body=new FormData()
  Body.append("email",email)
  Body.append("psw",psw)
const response=await adminlogin(Body)
console.log(response.data['data']);
console.log(response.data['token']);

if(response.status==200){
  localStorage.setItem("token",response.data['token'])
  setinputdata({
    ...inputdata,
   
   
    email:"",
    psw:"",
})
setloader(true)
setTimeout(() => {
  setloader(false)
  navigate('/admindashboard')
  
}, 3000);
}
}
}
  return (
    <>
    {useradd?
       <Alert variant="successs" text="center" onClose={() => setuseradd("")} dismissible>
        {useradd}
       </Alert>:""
    }
    
    <div className="container mt-5">

        <Row>
            <div className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded mt-5">
                <h2 className="heading">Admin Login</h2>
                
            <Form>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter the  user email </Form.Label>
        <Form.Control type="email" name="email" onChange={setinputvalue} placeholder="enter the admin email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter the password</Form.Label>
        <Form.Control type='password' name='psw' onChange={setinputvalue} placeholder='enter the password' />
      </Form.Group>
      <Button onClick={login} className='btn btn-success'>Login</Button>
      <div className="col-lg-7">
      <p className='mt-3'><b>dont'have an account register here</b></p>
      <a href='/adminregister' className='btn btn-warning'>Register</a>
{loader && <Loader/>}

      </div>
   

    </Form>
            </div>
            <div className="col-md-6">

                <div className="">
                    <img className='img1' src="https://www.godealergo.com/assets/images/secure-login.gif" alt="" />
                </div>
            </div>
        </Row>




        
    </div>
    <ToastContainer position='top-center'/>
    
    </>
  )
}

export default AdminLogin