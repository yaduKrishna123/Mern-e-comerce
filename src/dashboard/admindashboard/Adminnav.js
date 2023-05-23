import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Adminnav() {
  const nav=useNavigate()
  const logout=()=>{
    localStorage.removeItem("token")  
    nav('/')
  }
  return (
    <>
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">E-Cart Shooping <i className="fa-solid fa-bag-shopping fa-bounce"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <Nav.Link href="/addproducts">Add Products <i className="fa-solid fa-user"></i></Nav.Link>
            <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/admindashboard" style={{color:'blue',fontWeight:'bold'}}><i className="fa-solid fa-user"></i> Userdash board</NavDropdown.Item>
              <NavDropdown.Item href="/addproducts" style={{color:'white',fontWeight:'bold'}}>
              <i class="fa-solid fa-plus"></i> Add products
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>logout()} style={{color:'red',fontWeight:'bold'}} ><i className="fa-solid fa-backward fa-fade"></i>Logout</NavDropdown.Item>
             
             
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/wishlist">WishLists    <span style={{color:'red'}}><i className="fa-sharp fa-solid fa-heart fa-beat"></i></span> </Nav.Link>
            <Nav.Link eventKey={2} href="/cart">
              Cart <span><i className="fa-solid fa-cart-shopping fa-bounce"></i></span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  )
}

export default Adminnav