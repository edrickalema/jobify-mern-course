import links from "../utils/Links";
import { useDashboardContext } from "../pages/DashboardLayout";

import { NavLink } from "react-router-dom";

import React from "react";

function NavLinks() {
  const { user, toggleSideBar } = useDashboardContext();

  return (
    <div>
      {links.map((link, index) => {
        const { role } = user;

        if (link.path === "admin" && role !== "admin") return;
        return (
          <NavLink
            onClick={toggleSideBar}
            to={link.path}
            className='nav-link'
            key={index}
            end
          >
            <span className='icon'>{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
