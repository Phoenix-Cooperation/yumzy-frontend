import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ReactComponent as Home } from "../../assets/images/icons/home.svg"
import { ReactComponent as Notifications } from "../../assets/images/icons/bell.svg"
import { ReactComponent as Chat } from "../../assets/images/icons/chat.svg"
import { ReactComponent as Explore } from "../../assets/images/icons/explore.svg"
import { ReactComponent as Create } from "../../assets/images/icons/create.svg"
import { ReactComponent as Logo } from "../../assets/images/navbar-logo.svg"
import { ReactComponent as Search } from "../../assets/images/icons/search-icon.svg"

import AvatarDropdown from "./AvatarDropdown";

const NavBar = () => {

  
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
            <form>
              <Search />
              <input type="text" placeholder="Search"/>
            </form>
          </div>
          <Nav
            className="navbar__links"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">
              <Home className="navbar__linkImg" />
            </Nav.Link>
            <Nav.Link as={Link} to="/chat">
              <Chat className="navbar__linkImg" />
            </Nav.Link>
            <Nav.Link as={Link} to="/notifications">
              <Notifications className="navbar__linkImg" />
            </Nav.Link>
            <Nav.Link as={Link} to="/explore">
              <Explore className="navbar__linkImg" />
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              <Create className="navbar__linkImg" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <AvatarDropdown/>
      </Container>
    </Navbar>
  )
}

export default NavBar