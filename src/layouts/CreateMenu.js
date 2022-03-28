import React, { useState } from "react"
import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom"
import classNames from "classnames";
import { Link } from "react-router-dom"

const CreateMenu = () => {
  const [active, setActive] = useState("/create/recipe")
  console.log(active)
  return (
    <div className="d-flex flex-direction-row">
      <Nav
        activeKey="/create"
        onSelect={(selectedKey) => setActive(selectedKey)}
        className="create-menu"
      >
        <div className="create-menu__link-group">
          <Nav.Link 
            as={Link} 
            className={classNames(active === "/create/recipe" ? 
              "create-menu__link--active" : "create-menu__link")} 
            to="/create/recipe"
            onClick={() => setActive("/create/recipe")}
          >
              Recipe
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            className={classNames(active === "/create/tips" ? 
              "create-menu__link--active" : "create-menu__link")} 
            to="/create/tips"
            onClick={() => setActive("/create/tips")}
          >
              Tips
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            className={classNames(active === "/create/review" ? 
              "create-menu__link--active" : "create-menu__link")} 
            to="/create/review"
            onClick={() => setActive("/create/review")}
          >
            Review
          </Nav.Link>

        </div>
      </Nav>
      <Outlet />
    </div>
  )
}

export default CreateMenu