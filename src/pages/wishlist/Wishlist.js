import React, { useEffect, useState } from 'react'
import './wishlist.css'
import { Button, Row } from 'react-bootstrap'
import { WishlistToaddtocart, allwishlistdata, removeallwishlist, removewishlistitem } from '../../api/allapi'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'





function Wishlist() {

  const [alldata,setalldata]=useState([])
const RemoveAll=async()=>{
  try{
    const remdata=await removeallwishlist()
    if(remdata.status===200){
      alert('your cart is empty')
      setalldata(remdata.data)
      console.log(remdata);
    }

  }
  catch(error){
    console.log(error);
  }
}

const WishlistTOcart=async(category,name,image,price,stock)=>{

try{
  const WishlistCart=await WishlistToaddtocart(category,name,image,price,stock)
  if(WishlistCart.status===200){
    setalldata(WishlistCart.data)
  }


}
catch(error){
  console.log(error);
}

}


  const removeitem=async(id)=>{
    const baldata = await removewishlistitem(id)
    if(baldata.status===200){
      setalldata(baldata.data)
    }
  }

  const allitems=async()=>{
try{
  const wishlistitems=await allwishlistdata()
  if(wishlistitems.status===200){
    setalldata(wishlistitems.data)
    console.log(alldata);

  }

}
catch(error){
  console.log(error);
}
  }
  const nav=useNavigate()

useEffect(()=>{

  if(!localStorage.getItem("token")){
    alert('Login required')
    nav('/')
  }
  allitems()

},[])

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
        <th>image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
{ alldata.map((item)=>(

<tr>
<td>{item.name} 1</td>
<td>$   {item.price}</td>
<td><img style={{height: '100px;'}} src={item.image} alt="" /></td>

<td>
  {/* <button class="remove-button">Add to cart</button> */}
  <Button onClick={()=> WishlistTOcart(item.category,item.name,item.image,item.price,item.stock)}  className='btn btn-primary'>Add to cart <i class="fa-solid fa-cart-shopping fa-bounce"></i> </Button>
  <Button onClick={()=>removeitem(item._id)} className='btn btn-danger mt-2'>Remove <i class="fa-solid fa-xmark"></i></Button>

</td>
</tr>


))      }
 
    </tbody>
  </table>
</div>

        </div>
        
      </Row>
      <Row>
        <div className="col-lg-4"></div>
        <div className="col-lg-5">

          <Button onClick={()=>RemoveAll()} className='btn btn-secondary' style={{color:'black',fontWeight:'bold'}}>Remove All <i class="fa-solid fa-xmark"></i></Button>
        </div>
      </Row>

    </div>
    
 

    
    
    </>
  )
}

export default Wishlist