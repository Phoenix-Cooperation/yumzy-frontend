import React, {useState} from "react"
import {Nav, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import classNames from "classnames";

const Setting = () => {
  const [active, setActive] = useState("/setting/notification")
  return (
    <div className="d-flex flex-direction-row">
      <Navbar.Brand className="setting-menu">
        <div className="setting-menu__header-name">
          Settings
        </div>
      </Navbar.Brand>
      <Nav
        activeKey="/create"
        onSelect={(selectedKey) => setActive(selectedKey)}
        className="create-menu"
      >
        <div className="create-menu__link-group">
          <Nav.Link
            as={Link}
            className={classNames("create-menu__link", active === "/setting/notification" &&
              "create-menu__link--active")}
            to="/setting/notification"
            onClick={() => setActive("/setting/notification")}
          >
            Notification
          </Nav.Link>
          <Nav.Link
            as={Link}
            className={classNames("create-menu__link", active === "/setting/privacy" &&
              "create-menu__link--active")}
            to="/setting/privacy"
            onClick={() => setActive("/setting/privacy")}
          >
            Privacy
          </Nav.Link>
          <Nav.Link
            as={Link}
            className={classNames("create-menu__link", active === "/setting/logout" &&
              "create-menu__link--active")}
            to="/setting/logout"
            onClick={() => setActive("/setting/logout")}
          >
            Log Out
          </Nav.Link>


        </div>
      </Nav>
      <Outlet/>
    </div>
  )
}

export default Setting;