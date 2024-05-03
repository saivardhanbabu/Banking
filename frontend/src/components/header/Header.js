import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";


function Header() {
  let {currentUser,loginStatus} = useSelector(
    (state) => state.userLogin
  ); 
  let dispatch = useDispatch();

  function signout(){
    sessionStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    <nav
      className="navbar navbar-expand-sm fs-5"
      style={{ backgroundColor: "var(--medium-maroon)" }}
    >
      <div id="container1" className="container-fluid">
        <a className="navbar-brand" href="#">
          {/* <img src={logo} alt="" width="60px" /> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{fontFamily:"Fantasy",fontWeight:'bold'}}>
            {loginStatus === false ? (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to=""
                    style={{ color: "black" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signup"
                    style={{ color: "black" }}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signin"
                    style={{ color: "black" }}
                  >
                    LogIn
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
               
                <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "var(--light-grey)" }}
                  onClick={signout}
                >
                   <span className="lead  fs-4 me-3 fw-1"  style={{ color: "var(--yellow)" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>Username: {currentUser.username}
                   </span>
                   <span className="lead  fs-4 me-3 fw-1"  style={{ color: "var(--yellow)" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>Acc No: {currentUser.accountNo}
                   </span>
                  Signout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;