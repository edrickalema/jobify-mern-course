import React from "react";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
function Stats() {
  const { defaultStatus, monthlyApplications } = useLoaderData();
  console.log(monthlyApplications);
  return (
    <>
      <StatsContainer defaultStats={defaultStatus} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}

export default Stats;
