import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  let location = useLocation();
  console.log(location);

  const logoutUser = () => {
    setToken(null);
    localStorage.clear();
    navigate("/");
  };

  if (location.pathname === "/") {
    return <span></span>;
  }

  if (token) {
    return (
      <nav id="navbar">
        <NavLink to="/theories" className={"navbar-link"}>
          All Theories
        </NavLink>
        <NavLink to="/my-account" className={"navbar-link"}>
          My Account
        </NavLink>
      </nav>
    );
  }

  return (
    <nav id="navbar">
      <NavLink to="/register" className={"navbar-link"}>
        Register
      </NavLink>
      <NavLink to="/login" className={"navbar-link"}>
        Login
      </NavLink>
      <NavLink to="/theories" className={"navbar-link"}>
        All Theories
      </NavLink>
    </nav>
  );
}

export default Navbar;
