import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import customFetch from "../customFetch";
import { toast } from "react-toastify";

const DashBoardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};
function DashboardLayout() {
  const navigate = useNavigate()
  const data = useLoaderData();
  const user = data;

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleDarkTheme = () => {
    const newTheme = !isDark;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
  };
  const toggleSideBar = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('user has logged out')
  };
  return (
    <DashBoardContext.Provider
      value={{
        user,
        isDark,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />

          <div>
            <Navbar />

            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
}

export const useDashboardContext = (context) => useContext(DashBoardContext);
export default DashboardLayout;
