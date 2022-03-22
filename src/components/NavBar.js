
import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";

import { ReactComponent as Home} from "../assets/images/icons/home.svg"
import { ReactComponent as Notifications} from "../assets/images/icons/bell.svg"
import { ReactComponent as Chat} from "../assets/images/icons/chat.svg"
import { ReactComponent as Explore} from "../assets/images/icons/explore.svg"
import { ReactComponent as Logo} from "../assets/images/Logo.svg"

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Logo className="navbar__logo"/>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <div className="navbar__search">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav
              className="navbar__links"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1"><Home className="navbar__linkImg"/></Nav.Link>
              <Nav.Link href="#action2"><Chat className="navbar__linkImg"/></Nav.Link>
              <Nav.Link href="#action2"><Notifications className="navbar__linkImg"/></Nav.Link>
              <Nav.Link href="#action2"><Explore className="navbar__linkImg"/></Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>

        <div className="navbar__avatar">

        </div>

      </Container>
    </Navbar>
  )
}

export default NavBar