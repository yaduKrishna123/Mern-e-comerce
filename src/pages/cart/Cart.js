import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Decrememt, EmptyCart, Increment, getcart, removeallcart, removeitem } from '../../api/allapi'
import Modal from 'react-bootstrap/Modal';
import PaymentGateway from './PaymentGateway';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import { pielogics } from '../../api/allapi';
import Loaders from './Loaders';







function Cart() {
 const pie=[]
 const [loader,setloader]=useState(false)
const [cshop,setcshop]=useState(false)
const [coder,setcoder]=useState(false)

const [piestatus,setpiestatus]=useState(true)

const [alldata,setalldata]=useState([])
const [money,setmoney]=useState(0)
let Money=0

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const Chart=async(body)=>{
  const response=await pielogics(body)

  try{
    if(response.status===200){
      console.log(response.data);
      setpiestatus(false)
      setloader(true)

      setTimeout(() => {
        setpiestatus(true)
        setloader(false)
        
      }, 3000);
    }

  }
  catch(error){
    console.log(error);
  }
 
}

const deleteitem=async(id)=>{

  const deleteresponse=await removeitem(id)
  if(deleteresponse.status===200){
    setalldata(deleteresponse.data)
  }

}
const incrementstock=async(name)=>{
 try{
  const inresponse=await Increment(name)
  if(inresponse.status===200){
    console.log(inresponse);
    setalldata(inresponse.data)
  }
  else {
    alert("out of stock maximum amount of Stock is Added")
  }

 }
 catch(error){
  console.log(error);
 }
}
const decrementdata=async(name,price)=>{
try{
  const decdata=await Decrememt(name,price)
  if(decdata.status===200){
    setalldata(decdata.data)
  

  }

}  
catch(error){

}
}

const deletealldata=async()=>{
try{
  const deletedata=await removeallcart()
  if(deletedata.status===200){
    console.log(deletedata.data);
    setalldata([])
  }

}
catch(error){
  console.log(error);
}
}



const getAlldata=async()=>{
  const response=await getcart()
  if(response.status===200){
   
    setalldata(response.data)
    console.log(alldata);
  }
}


useEffect(()=>{
  getAlldata()
  if(!localStorage.getItem("token")){
    alert('Login required')
    nav('/')
  }

 


},[])
const nav=useNavigate()

const empty=async()=>{
  const emptycart=await EmptyCart()
  if(emptycart.status===200){
   
    setalldata(emptycart.data)

    setcshop(false)
    setcoder(false)
    
    
    alert('your cart is empty')

    nav('/')

  }
}
let datas=[]
const local=()=>{
  const storedArrayString = localStorage.getItem('charts');

// Parse the string back to an array
const storedArray = JSON.parse(storedArrayString);

datas.push(storedArray[0][0].category)
console.log(datas);


const pdata=JSON.stringify(datas)
localStorage.setItem("pdata",pdata)
console.log(storedArray);
}





const createOrder = (data, actions) => {
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: `${Money}` // Set the payment amount here
        },
      },
    ],
  });
};

const onApprove = (data, actions) => {
  return actions.order.capture().then(function (details) {
    console.log(details); 
  setcshop(true)
 


    alert('payment successs')
  });
};

const [inputdata, setinputdata] = useState({
  name: "",
  adress: "",
  pincode: ""
});

const setinputvalue = (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  setinputdata({ ...inputdata, [name]: value });
};
console.log(inputdata);
 
const order=()=>{
  const {name,adress,pincode}=inputdata
  if(name===''){
    toast.error("name required")

  }
  else if(adress===''){
    toast.error("Adress is required for purchase")
  }
  else if(pincode===''){
    toast.error("pincode is required for purchase")
  }
  else{
    setcoder(true)

  }
}




  return (
    <>
    <Header/>
    
    <div className="container mt-4">

      <Row>
        <div className="col-lg-12">
        <div class="wishlist-table">
  <table>
    <thead>
   
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Product image</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

    {
        alldata.map((item)=>(
        
          

<tr>
<td style={{width:"18%",color:"white",fontSize:"20px"}}> {item.name}</td>
<td className='ms-5' style={{width:"20%",color:"white",fontSize:"30px"}}><i class="fa-solid fa-indian-rupee-sign fa-flip"></i>{item.price} </td>

<td className='ms-5'><img style={{height: '100px;',width:"60%"}} src={item.image} alt="img" /></td>
<td style={{width:"30%",color:"white",fontSize:"30px"}}><strong>{item.stock}</strong></td>
{Money+=item.price}
<td >
  {/* <button class="remove-button">Add to cart</button> */}
 
  <Button onClick={()=>incrementstock(item.name)}  className='btn btn-primary'><i class="fa-solid fa-plus fa-beat"></i> </Button>
  <Button onClick={()=>decrementdata(item.name,item.price)}  className='btn btn-success'><i class="fa-solid fa-minus fa-spin"></i> </Button>
  <Button onClick={()=>deleteitem(item._id)}  className='btn btn-danger mt-2'>Remove <i class="fa-solid fa-xmark"></i></Button>

  {/* <Button onClick={()=>local()}  className='btn btn-primary mt-2'>local <i class="fa-solid fa-xmark"></i></Button> */}
{piestatus==true?  <Button onClick={()=>Chart(item.category)} className='btn btn-primary mt-2'>Confirm order <i class="fa-solid fa-truck fa-fade"></i></Button>:''}

{loader==true?<div style={{width:'100%'}} className="mt-2"> <Loaders/>  </div>:''}

</td>
</tr>



          
        ))
      }



 
    </tbody>
  </table>
</div>

        </div>
        
      </Row>
      <Row>
        <div className="col-lg-4">
          <h2>Grand Total</h2>
       

          <h4 className='text-warning ms-5 mt-5'>{Money}</h4>
          <Button variant="primary" onClick={handleShow}>
          Check out &nbsp; <i class="fa-brands fa-paypal fa-beat-fade"></i>
      </Button>
        </div>
        <div className="col-lg-5">

          <Button onClick={()=>deletealldata()}  className='btn btn-secondary' style={{color:'black',fontWeight:'bold'}}>Remove All <i class="fa-solid fa-xmark"></i></Button>
        </div>
      </Row>

    </div>
    
 
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Place Oder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Enter the  user name </Form.Label>
  <Form.Control   name="name"
                  value={inputdata.name}
                  onChange={setinputvalue} type="text" placeholder="enter the username" />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label>Enter the Adress</Form.Label>
  <Form.Control   name="adress"
                  value={inputdata.adress}
                  onChange={setinputvalue} type='text' placeholder='enter the Adress' />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label>Enter the pincode</Form.Label>
  <Form.Control   name="pincode"
                  value={inputdata.pincode}
                  onChange={setinputvalue} type='text' placeholder='enter the pincode' />
</Form.Group>
<Button onClick={()=>order()} className='btn btn-primary'>Confirm</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <h1></h1> */}
          {coder==true?    <PayPalScriptProvider options={{ 'client-id': 'AagLJhZzJJYK1R2NJYMnp9xiZLcSiLCV5Y1G7Ja4WXjowSOm2NGuTxXS8Sr6TCL47wfAUOvFqrAtWhuf' }}>
    <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'horizontal',cursor:'pointer'}} // Adjust the button layout here
      /> 
    </PayPalScriptProvider> :'' }
     
          {cshop==true?<Button onClick={()=>empty()} variant="primary">Continue &nbsp; <i class="fa-solid fa-bag-shopping fa-bounce"></i> </Button>:''}
        </Modal.Footer>
      </Modal>
    
      <ToastContainer position='top-center' />

    </>
  )
}

export default Cart