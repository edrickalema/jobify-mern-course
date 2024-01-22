import React, { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";

import { useDashboardContext } from "../pages/DashboardLayout";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);

  const { user, logoutUser } = useDashboardContext();
  console.log(user)
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='btn logout-btn'
          onClick={() => setShowLogout(!showLogout)}
        >
          {user.avatar ? (
            <img src={user?.avatar} alt='avatar' />
          ) : (
            <FaUserCircle />
          )}
          {user?.name}
          <FaAngleDown />
        </button>

        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type='button' onClick={logoutUser} className='dropdown-btn'>
            Logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default LogoutContainer;
