import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'



import { Button, FormControl, Row,Form } from 'react-bootstrap'
import Loader from '../../pages/adminregister/Loader'
import { addproduct } from '../../api/allapi';
import { useNavigate } from 'react-router-dom';



function Addproducts() {
    const nav=useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            alert('login required')
            nav('/')
        }
      
    },[])
    // const {useradd,setuseradd}=useContext(addData)
    const option=[
        {value:"Electronics",label:"Electronics"},
        {value:"clothing",label:"clothing"},
        {value:"footwear",label:"footwear"},
        {value:"beautyproducts",label:"beautyproducts"}

    ]
    const [status,setstatus]=useState("Electronics")

    
    const [loader,setloader]=useState(false)
    const [inputdata,setinputdata]=useState({
       
        name:"",
        image:"",
        price:"",
        stock:""
    })
   
    const setinputvalue=(e)=>{
        // e.preventDefaults();
        const {name,value}=e.target
        setinputdata({...inputdata,[name]:value})
        console.log(inputdata);
      
   

    }
    const setstatusvalue=(e)=>{
        setstatus(e.value)
    }

    const viewimage=inputdata.image
    // console.log(viewimage);
    const addproducts=async(event)=>{
        console.log(status.value);
        event.preventDefault();
        const{name,image,price,stock}=inputdata

        if(status===""){
            toast.error("category is required")
        }
        else if(name===""){
            toast.error("product name is  required")
        }
        else if(image===""){
            toast.error("product  image url is  required")
        }
        else if(price===""){
            toast.error("product price is  required")
        }
        else if(stock===""){
            toast.error("product stock is  required")
        }
        else{

            const Data=new FormData()

            Data.append("category",status.value)
            Data.append("name",name)
            Data.append("image",image)
            Data.append("price",price)
            Data.append("stock",stock)

            const response=await addproduct(Data)

            if(response.status==200){
                console.log(response);
                setinputdata({
                    ...inputdata,
                    category:"",
                    name:"",
                    image:"",
                    price:"",
                    stock:""
                    
                })
                setloader(true)

                setTimeout(() => {
                    setloader(false)
                    
                }, 3000);
            }

        }
        
        

    }
    
  return (
    <>
    
    <Adminnav/>
    <div className="container mt-5">
        
        <Row>
            <div className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded mt-1    ">
                <h2 className="heading text-success">ADD Products </h2>
                
            <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Category </Form.Label>
        <div className="" style={{color:'black'}}>  <Select options={option} onChange={setstatus} >  </Select></div>

        </Form.Group>



        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> name of the product </Form.Label>
        <Form.Control type="text" name="name" value={inputdata.name } onChange={setinputvalue} placeholder="enter the name of the product" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter the image url</Form.Label>
        <Form.Control type='text' name="image" value={inputdata.image } onChange={setinputvalue} placeholder='enter the image url' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter the price</Form.Label>
        <Form.Control type='number' name="price" value={inputdata.price } onChange={setinputvalue} placeholder='enter the price' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>STOCK</Form.Label>
        <Form.Control type='number' name="stock" value={inputdata.stock } onChange={setinputvalue} placeholder='enter the Stock' />
        </Form.Group>
      
        <Button onClick={addproducts}  className='btn btn-primary'>Add Product</Button>
        <div className="col-lg-7">
        
        
        <div className="">
        {loader && <Loader/>}
        </div>
        
        
        </div>
        
        
        </Form>
            </div>
            <div className="col-md-6">
        
                <div className="">
                    <img className='img1' src={viewimage?viewimage:"https://cdn.dribbble.com/users/1655164/screenshots/4818499/ss.gif"} alt="" />
                </div>
            </div>
        </Row>
        
        
        
        
        
        </div>
        // tostify
    <ToastContainer position='top-center'/>
    </>
  )
}

export default Addproducts