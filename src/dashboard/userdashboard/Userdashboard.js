import React, { useEffect } from 'react'
import { Container, Dropdown, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Corosal from './Corosal'


function Userdashboard() {
const nav=useNavigate()


useEffect(()=>{
    if(!localStorage.getItem("token")){
        alert("login required")
        nav('/')
    }

},[])

    const logout=()=>{
        localStorage.removeItem("token")
        nav('/')
    }
  return (
    <>
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">E-Cart Shooping <i className="fa-solid fa-bag-shopping fa-bounce"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/userdashboard" style={{color:'blue',fontWeight:'bold'}}><i className="fa-solid fa-user"></i> Userdash board</NavDropdown.Item>
           
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

<Corosal/>
    
    
    
    </>
  )
}

export default Userdashboard