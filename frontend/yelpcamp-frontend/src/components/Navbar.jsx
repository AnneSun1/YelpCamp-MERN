import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  const user = useSelector((state) => state.user.user);

  const LoginComponent = () => {
    return ( 
      <div>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link> 
      </div>
    )}

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">YelpCamp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
            { (user === null) ? <LoginComponent/> : 
            <Nav.Link href="/logout">Logout</Nav.Link> }
            
          </Nav>
        </Container>
      </Navbar>
      
      
    </>
  );
}

export default ColorSchemesExample;
