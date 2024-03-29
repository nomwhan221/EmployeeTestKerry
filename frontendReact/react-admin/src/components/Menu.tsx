import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
//import { Link } from "react-router-dom";

const Menu = () => {
  const logout = async () => {
    await axios.post("logout");
  };
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      {/* <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel"> */}
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to={"/users"}
                className="nav-link d-flex align-items-center gap-2 "
              >
                User
              </NavLink>
            </li>
          </ul>

          <ul className="nav flex-column mb-auto">
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
