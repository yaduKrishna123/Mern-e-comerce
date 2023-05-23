import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">E-Cart Shooping <i class="fa-solid fa-bag-shopping fa-bounce"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="adminlogin">AdminLogin <i class="fa-solid fa-key"></i> </Nav.Link>
            <Nav.Link href="/login">UserLogin <i class="fa-solid fa-user"></i></Nav.Link>
            {/* <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Electronics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Clothing
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Beauty products</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Footwear
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="/wishlist">WishLists    <span style={{color:'red;'}}><i class="fa-sharp fa-solid fa-heart fa-beat"></i></span> </Nav.Link>
            <Nav.Link eventKey={2} href="/cart">
              Cart <span><i class="fa-solid fa-cart-shopping fa-bounce"></i></span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
      
    




    </>
  )
}

export default Header