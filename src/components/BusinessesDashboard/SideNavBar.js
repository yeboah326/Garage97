import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import SvgLogOut from "../../Assets/icons/LogOut";
import { NavLink } from "react-router-dom";
import { logout } from "../../auth/index";
import SecureStorage from "../../auth/secure";

const SideNavBar = ({ onClick, navwidth, onHover }) => {
  const user = SecureStorage.get("User").name.split(" ");

  return (
    <div
      className="side-nav-bar"
      style={{ width: { navwidth } }}
      onMouseOut={onHover}
    >
      <div className="close-side-nav-bar" onClick={onClick}>
        <button>x</button>
      </div>
      <Avatar name={`${user[0]} ${user.slice(-1)}`} image="" />
      <div className="logout">
        <NavLink
          to=""
          onClick={() => logout()}
          className="business-logout-link logout-link"
        >
          <SvgLogOut stroke="#c0c0c0" fill="#c0c0c0" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavBar;
