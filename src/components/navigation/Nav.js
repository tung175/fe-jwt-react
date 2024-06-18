import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isShow, setIsShow] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);

  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">User</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
