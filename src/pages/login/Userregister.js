import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adduser } from '../../api/allapi';

function Userregister() {

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

  const register = async (event) => {
    event.preventDefault();

    const { name, mobile, psw } = inputdata;
    if (name === "") {
      toast.error("First name required");
    } else if (mobile === "") {
      toast.error("Mobile number required");
    } else if (psw === "") {
      toast.error("Password required");
    } else {
      // Perform registration logic here
      const Data=new FormData()
      Data.append("name",name)
      Data.append("mobile",mobile)
      
      Data.append("psw",psw)
  
      const responses=await adduser(Data)

      if(responses.status===200){
        console.log(responses);
        alert(responses.data)
      }
      else{
        alert('user already exists')
      }
    
    }

    
  };

  return (
    <>
      <Header />

      <div className="container">
        <Row>
          <div className="col-lg-5 mt-4">
            <img
              className='userloginimg'
              src="https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/214161532/original/a062fe5d5690e1f0f4101779e613b8a17416edde.png"
              alt=""
            />
          </div>
          <div className="col-lg-6 shadow-lg p-3 mb-5 bg-body rounded mt-5">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter the user name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={inputdata.name}
                  onChange={setinputvalue}
                  placeholder="Enter the username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter the unique mobile number</Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  value={inputdata.mobile}
                  onChange={setinputvalue}
                  placeholder="Enter the mobile number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter the password</Form.Label>
                <Form.Control
                  type="password"
                  name="psw"
                  value={inputdata.psw}
                  onChange={setinputvalue}
                  placeholder="Enter the password"
                />
              </Form.Group>
              <Button onClick={register} className='btn btn-success'>Register</Button>
              <div className="col-lg-7">
                <p className='mt-3'><b>Don't have an account? Register here</b></p>
                <a href='/login' className='btn btn-primary'>Login</a>
              </div>
            </Form>
          </div>
        </Row>
      </div>

      <ToastContainer position='top-center' />
    </>
  );
}

export default Userregister;
