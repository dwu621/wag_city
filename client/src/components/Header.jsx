import { useContext } from 'react'
import { DataContext } from './DataContext'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


const Header = () => {
    const { authenticated, user, handleLogOut } = useContext( DataContext )

    let authenticatedOptions
    if (user && user.userType === 'Owner') {
        authenticatedOptions = (
         
                <Nav className="ms-auto">
                 
                    <Nav.Link href='profile'>{user.firstName}</Nav.Link>
                    {/* <NavLink href='/'>Home</NavLink> */}
                    <Nav.Link href={`dogs`}>Dogs</Nav.Link>
                    <Nav.Link href={`jobs`}>Jobs </Nav.Link>
                    <Nav.Link href='/' onClick={handleLogOut}>Signout</Nav.Link>
                </Nav>
  
        )
    } else if (user) {
        authenticatedOptions = (
         
            <Nav className="ms-auto">
                <Nav.Link href='profile'>{user.firstName}</Nav.Link>
                {/* <Nav.Link href='/'>Home</Nav.Link> */}
                <Nav.Link href={`jobs`}>Jobs </Nav.Link>
                <Nav.Link href='/' onClick={handleLogOut}>Signout</Nav.Link>
            </Nav>

    )
    }
    
    const publicOptions = (
      
            <Nav className="ms-auto">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='signup'>Register</Nav.Link>
                <Nav.Link href='login'>Login</Nav.Link>
            </Nav>
    
        
    )
    
 
    return(
        <Navbar collapseOnSelect expand="lg" bg='primary' text='primary'>
            <Container>
                <Navbar.Brand href='/'>Wagcity</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {authenticated && user ? authenticatedOptions : publicOptions}
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )

}

export default Header 