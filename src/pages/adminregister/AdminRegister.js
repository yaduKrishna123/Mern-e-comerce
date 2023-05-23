import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Row } from 'react-bootstrap'
import Header from '../../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminregister } from '../../api/allapi';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../context/Contextshare';
import Loader from './Loader';








function AdminRegister() {
    useEffect(()=>{
     

    },[])
    

    // loader
    const [loader,setloader]=useState(false)

const {useradd,setuseradd}=useContext(addData)

    const navigate=useNavigate()
    const [inputdata,setinputdata]=useState({
        username:"",
        image:"",
        mail:"",
        psw:"",
        cpsw:""
    })
   
    const setinputvalue=(e)=>{
        //  e.preventDefaults();
        const {name,value}=e.target
        setinputdata({...inputdata,[name]:value})
   

    }
    
    const viewimage=inputdata.image
    console.log(viewimage);
    const register=async (event)=>{
        // event.preventDefault();

        const {username,image,email,psw,cpsw}=inputdata
        if(username===""){
            toast.error("First name requiresd")

          
        }
        else if(image===""){
            toast.error("image requiresd")

        }
        else if(email===""){
            toast.error("email requiresd")

        }
        else if(psw===""){
            toast.error("password requiresd")

        }
        else if(cpsw===""){
            toast.error("confirm password requiresd")

        }
        else if(psw!==cpsw){
            toast.error("password not matched")
        }
        else{
            const Data=new FormData()
            Data.append("username",username)
            Data.append("image",image)
            Data.append("email",email)
            Data.append("psw",psw)
            Data.append("cpsw",cpsw)

            const response=await adminregister(Data)
            console.log(response);
            if(response.status===200){
                setinputdata({
                    ...inputdata,
                    username:"",
                    image:"",
                    email:"",
                    psw:"",
                    cpsw:""
                    
                })
                setloader(true)
                setuseradd(response.data)
                setTimeout(() => {
                    setloader(false)
                    navigate('/adminlogin')

                    
                }, 3000);

            }
            else{
                alert('useralready exists')
            }
           
          
        }
    }
  return (
    <>
    <Header/>
    
    <div className="container mt-5">
        
<Row>
    <div className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded mt-1    ">
        <h2 className="heading text-success">Admin Register </h2>
        
    <Form >

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Enter the admin name </Form.Label>
<Form.Control type="text" name="username" value={inputdata.username } onChange={setinputvalue} placeholder="enter the admin username" />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>Enter the image url</Form.Label>
<Form.Control type='text' name="image" value={inputdata.image } onChange={setinputvalue} placeholder='enter the image url' />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>Enter the maid id</Form.Label>
<Form.Control type='email' name="email" value={inputdata.email } onChange={setinputvalue} placeholder='enter the mailid' />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>Enter a password</Form.Label>
<Form.Control type='password' name="psw" value={inputdata.psw } onChange={setinputvalue} placeholder='enter the password' />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>confirm  password</Form.Label>
<Form.Control type='password' name="cpsw" value={inputdata.cpsw } onChange={setinputvalue} placeholder='confirm password' />
</Form.Group>
<Button onClick={register}  className='btn btn-primary'>Register</Button>
<div className="col-lg-7">
<p className='mt-3'><b>have an account register here</b></p>
<a href='/adminlogin' className='btn btn-success'>Login</a>

<div className="">
{loader && <Loader/>}
</div>


</div>


</Form>
    </div>
    <div className="col-md-6">

        <div className="">
            <img className='img1' src={viewimage?viewimage:"https://miro.medium.com/v2/resize:fit:1400/1*9m-WDdL_ji01bGbjEnutEw.gif"} alt="" />
        </div>
    </div>
</Row>





</div>
{
    // tostify
    <ToastContainer position='top-center'/>
}
    
    
    </>
  )
}

export default AdminRegister