// import "./AuthorProfile.css";
import './user.css'
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function UserProfile() {
  let {currentUser}=useSelector(state=>state.userLogin)

 
  return (
    <div className="user-profile container-fluid">
      <ul className="nav  justify-content-around fs-3">
      <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`dashboard/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`funds/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Add funds
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="funds-transfer"
            style={{ color: "var(--dark-green)" }}
          >
            Transfer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`funds-history/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Transaction History
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default UserProfile;