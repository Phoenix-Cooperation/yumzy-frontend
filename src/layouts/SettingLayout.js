import React, {useState} from "react"
import {Nav, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import classNames from "classnames";

const SettingLayout = () => {
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
            to="/settings/notification"
            onClick={() => setActive("/settings/notification")}
          >
            Notification
          </Nav.Link>
          <Nav.Link
            as={Link}
            className={classNames("create-menu__link", active === "/setting/privacy" &&
              "create-menu__link--active")}
            to="/settings/privacy"
            onClick={() => setActive("/settings/privacy")}
          >
            Privacy
          </Nav.Link>
          <Nav.Link
            as={Link}
            className={classNames("create-menu__link", active === "/setting/logout" &&
              "create-menu__link--active")}
            to="/settings/logout"
            onClick={() => setActive("/settings/logout")}
          >
            Log Out
          </Nav.Link>


        </div>
      </Nav>
      <Outlet/>
    </div>
  )
}

export default SettingLayout;