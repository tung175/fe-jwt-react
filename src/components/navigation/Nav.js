import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <>
      <div className="topnav">
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </>
  );
};

export default Nav;
