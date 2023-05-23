import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Button, Card, Col, Row,Alert, InputGroup, Form } from 'react-bootstrap'
import '../allproducts/allproducts.css'
import {  addtowishlist, displayproduct } from '../../api/allapi'
import Btn from './Btn'
import Corosal from '../../dashboard/userdashboard/Corosal'







function Allproducts() {

  // const [show, setShow] = useState(false);


const [search,setsearch]=useState("")

  const [alldata,setalldata]=useState([])
 




const Allproducts=async()=>{
  const response=await displayproduct(search)
  if(response.status===200){
    setalldata(response.data)
    console.log(response.data);
  }
}
const [error, setError] = useState(null);
const wishlist=async(category,name,image,price,stock)=>{
 
try{
  const response =await addtowishlist(category,name,image,price,stock)
  if(response.status===200){
   console.log(response.data);
   alert('item added to your wishlist')
  }
  else if(response.status===401){
    alert('item already in your cart')
  }
  else if(response.status===404){
    alert('product is out of stock')
  }
  else{
    alert('item already in your cart')
    setError(response.data.error.message);
   
  }


}
catch(error){
  console.error(error.response.data);
}
}

useEffect(()=>{
  Allproducts()


},[search])

  return (
    <>
    <Header/>
    <Corosal/>
    <div className="container">
   

    <div className="">
      <Row>
        <div className="col-lg-4 mt-2">

        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-magnifying-glass fa-spin" style={{color: '#080b04'}}></i></InputGroup.Text>
        <Form.Control
          placeholder="Search"
          onChange={e=>setsearch(e.target.value)}
        
          
        />
     </InputGroup>

        </div>
      </Row>
   
      <Row>
        {
          alldata.map((item)=>(


            <Col md={3} className='mt-5'>
        


            <Card style={{ width: '100%',height:'710px',padding:'5px' }} >
       <a href={`/products/${item._id}`}> <Card.Img variant="top" src={item.image} /></a>
        <Card.Body>
          <Card.Title>  <h2>{item.name}</h2></Card.Title>
  
          <Card.Text>
  
          <h4>₹ {item.price}</h4>
          <p><b>{item.stock}</b></p>
          </Card.Text>
          <Button onClick={()=>wishlist(item.category,item.name, item.image, item.price, item.stock)} variant="primary">Add to Favourates <i class="fa-solid fa-heart"></i> </Button>
         <br /> <br></br>
          {/* <Button variant="warning">Add to cart <i class="fa-solid fa-cart-shopping"></i></Button> */}
          <div className="" style={{display:'center',paddingRight:'82px'}}>
          <Btn category={item.category} name={item.name} image={item.image} price={item.price} stock={item.stock} setalldata={setalldata}/>

          </div>
  
        </Card.Body>
      </Card>
  
           
         
          
          
          </Col>



          ))
        }
       
        
      </Row>
   
    </div>

    </div>
    
 
    
    
    
    
    <Footer/>
    </>
  )
}

export default Allproducts