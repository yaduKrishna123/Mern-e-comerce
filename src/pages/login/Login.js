import React, { useState } from 'react'
import Header from '../../components/Header'
import { Button, Form, Row } from 'react-bootstrap'
import '../login/loginuser.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin } from '../../api/allapi';
import Loader from '../adminregister/Loader';
import { useNavigate } from 'react-router-dom';




function Login() {
 const nav= useNavigate()
  const [loader,setloader]=useState(false)
  const [inputdata, setinputdata] = useState({
    name: "",
    mobile: "",
    psw: ""
  });

  const setinputvalue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setinputdata({ ...inputdata, [name]: value });
  };
  console.log(inputdata);
  const login=async(e)=>{
    // e.preventDefalult()
    const {name,psw}=inputdata
    if(name===""){
      toast.error("enter your email")
    }
    else if(psw===""){
      toast.error("enter your password")
    }
    else{
      const Body=new FormData()
      Body.append("name",name)
      Body.append("psw",psw)

      const response=await userLogin(Body)
      console.log(response);
      if(response.status===200){
        console.log(response);
        console.log(response.data['data']);
console.log(response.data['token']);
localStorage.setItem("token",response.data['token'])
setinputdata({
  ...inputdata,
 
 
  name:"",
  psw:"",
})
setloader(true)
setTimeout(() => {
  setloader(false)
  nav('/userdashboard')
  
}, 3000);
      }
      else{
        alert("user not found pleade register")
      }
    }
  }



  return (
    <>
    <Header />

    <div className="container">
        <Row>
            <div className="col-lg-5 mt-4">
                <img className='userloginimg' src="https://assets.materialup.com/uploads/5e44fc53-258d-49bb-b68f-380b56c0c0a5/preview.gif" alt="" />

            </div>
            <div className="col-lg-6 shadow-lg p-3 mb-5 bg-body rounded mt-5">
            <Form>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Enter the  user name </Form.Label>
  <Form.Control   name="name"
                  value={inputdata.name}
                  onChange={setinputvalue} type="text" placeholder="enter the username" />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label>Enter the password</Form.Label>
  <Form.Control   name="psw"
                  value={inputdata.psw}
                  onChange={setinputvalue} type='password' placeholder='enter the password' />
</Form.Group>
<Button onClick={login} className='btn btn-success'>Login</Button>
<div className="col-lg-7">
<p className='mt-3'><b>dont'have an account register here</b></p>
<a href='/Userregister' className='btn btn-warning'>Register</a>
<div className="ms3">
 { loader==true?<Loader/>:''}
</div>

</div>


</Form>

            </div>
        </Row>


    </div>
    <ToastContainer position='top-center' />

    </>
  )
}

export default Login