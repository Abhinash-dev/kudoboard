import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
    const [userid, setuserid] = useState(localStorage.getItem('user_id'));
    const [userfirstname, setuserfirstname] = useState(localStorage.getItem('firstname'));
    const [userlastname, setuserlastname] = useState(localStorage.getItem('lastname'));
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        window.location.href = window.location.origin;
    }
    return (
        <>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">KudoBoard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle'/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {
                            userid !== undefined && userid !== null && userid !== "" ?
                                <>
                                    <Nav.Link href={`${window.location.origin}/dashboard/${userid}`}>dashboard</Nav.Link>
                                    <Nav.Link href={`${window.location.origin}/create`}>Create Board</Nav.Link>

                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    <p className='user-info'>Welcome {userfirstname}</p>


                                    {/* <p>{props.user.firstname}</p> */}
                                </> :
                                <>
                                    <Nav>
                                        <Nav.Link href="/login">Login</Nav.Link>

                                        <Nav.Link eventKey={2} href="/register">Register</Nav.Link>
                                    </Nav>

                                </>
                        }



                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>


        </>
    );
}




export default Header