import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import '../Viewproducts/view.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { addtocart, addtowishlist, viewproduct } from '../../api/allapi'
import { useParams } from 'react-router-dom'






function View() {
  const AddtoWishlist=async(category,name,image,price,stock)=>{
    try{
      const additem=await addtowishlist(category,name,image,price,stock)

      if(additem.status===200){
        alert('item added in your wish list')
      }
      else{
        alert('item already in your cart')
      }

    }
    catch(error){
      console.log(error);
    }

  }
  const  Addtocart=async(category,name,image,price,stock)=>{
    try{
      const response=await addtocart(category,name,image,price,stock)
      if(response.status===200){
        alert('item added to cart')
      }
      else{
        alert("out of stock")
      }


    }
    catch(error){
      console.log(error);
    }
  }

  const [view,setview]=useState([])
  const {id}=useParams()

  const viewdata=async ()=>{
    const dataview=await viewproduct(id)
    console.log(dataview);
    setview(dataview.data)
    console.log(view);
  

  }
  useEffect(()=>{
    viewdata()
   

  },[])
  return (
    <>
    <Header/>
    
    <div className="container mt-5">
      <Row>
     <Col lg={8}>
     <Card style={{ width: '100%',height:'700px' }} >
     <a href='/products/4'> <Card.Img variant="top" style={{ width: '100%',height:'400px' }}  src={view.image} /></a>
      <Card.Body>
        <Card.Title className='title'>  <h2>{view.name}</h2></Card.Title>

        <Card.Text>

        <h4 className='price'>₹52000</h4>
        <p><b>STOCK : {view.stock}</b></p>
        </Card.Text>
        <Button onClick={()=>AddtoWishlist(view.category,view.name,view.image,view.price,view.stock)} variant="primary">Add to Favourates <i class="fa-solid fa-heart"></i> </Button>
       <br /> <br></br>
        <Button onClick={()=>Addtocart(view.category,view.name,view.image,view.price,view.stock)} variant="warning">Add to cart <i class="fa-solid fa-cart-shopping"></i></Button>

      </Card.Body>
    </Card>

     </Col>
          
     </Row>
        </div>
        <div className="mt-5">

        <Footer/>

        </div>

      

    
    </>
  )
}

export default View