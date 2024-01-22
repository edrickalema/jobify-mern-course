import React, { createContext, useContext } from "react";
import customFetch from "../customFetch";
import { useLoaderData } from "react-router-dom";
import { JobContainer, SearchContainer } from "../components";
import { toast } from "react-toastify";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const data = await customFetch.get("/jobs", {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();
function AllJobs() {
  const { data, searchValues } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = (context) => useContext(AllJobsContext);

export default AllJobs;
