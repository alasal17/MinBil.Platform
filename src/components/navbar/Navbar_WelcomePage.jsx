import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbar_WelcomePage() {
    
    
    
    return ( 
        
 
  <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/welcome">Min bil</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Nav.Link href="/login">Bedrift</Nav.Link>
            <Nav.Link href="#action2">Privat</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Søk..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" style={{width:'30vh'}}>  Søk  </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default Navbar_WelcomePage;