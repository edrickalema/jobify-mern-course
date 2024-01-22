import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import customFetch from "../customFetch.js";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "../components/StatItem.jsx";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not allowed to access this page");
    return redirect("/dashboard");
  }
};
function Admin() {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        icon={<FaSuitcaseRolling />}
        bcg='#fcefc7'
      />
      <StatItem
        title='jobs'
        count={jobs}
        color='#647acb'
        icon={<FaCalendarCheck />}
        bcg='#e0e8f9'
      />
    </Wrapper>
  );
}

export default Admin;
