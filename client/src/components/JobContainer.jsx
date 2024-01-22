import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageButtonContainer from "./PageButtonContainer";

function JobContainer() {
  const { data } = useAllJobsContext();

  const { jobs, numOfPages, totalJobs } = data.data;
  console.log(jobs)
  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display</h2>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <h5>
          {totalJobs} Job{jobs?.length > 1 && "s"} Found
        </h5>
        <div className='jobs'>
          {jobs.map((job) => {
            return <Job key={job._id} {...job} />;
          })}
        </div>

        {numOfPages > 1 && <PageButtonContainer />}
      </Wrapper>
    );
  }
}

export default JobContainer;
