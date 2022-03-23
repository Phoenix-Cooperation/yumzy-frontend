import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { ReactComponent as Home } from "../assets/images/icons/home.svg"
import { ReactComponent as Notifications } from "../assets/images/icons/bell.svg"
import { ReactComponent as Chat } from "../assets/images/icons/chat.svg"
import { ReactComponent as Explore } from "../assets/images/icons/explore.svg"
import { ReactComponent as Logo } from "../assets/images/navbar-logo.svg"

const NavBar = () => {

  const GET_USER = gql`
    query GetUser {
      user @client
    }
  `

  const { data } = useQuery(GET_USER);
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div href="#">
          <Link to="/home">
            <Logo className="navbar__logo" />
          </Link>
        </div>
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
              <Nav.Link href="#action1"><Home className="navbar__linkImg" /></Nav.Link>
              <Nav.Link href="#action2"><Chat className="navbar__linkImg" /></Nav.Link>
              <Nav.Link href="#action2"><Notifications className="navbar__linkImg" /></Nav.Link>
              <Nav.Link href="#action2"><Explore className="navbar__linkImg" /></Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>

        {data.user.photoURL && (
          <div className="navbar__avatar">
            <img src={data.user.photoURL} />
          </div>

        )}

      </Container>
    </Navbar>
  )
}

export default NavBar