import React from "react";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import JobInfo from "./JobInfo";
import customFetch from "../customFetch";
import { Form, Link } from "react-router-dom";
import dayjs from "dayjs";
import Wrapper from "../assets/wrappers/Job";

import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
function Job({
  _id,
  company,
  jobType,
  position,
  createdAt,
  jobLocation,
  jobStatus,
}) {
  const date = dayjs(createdAt).format("MMM Do, YYY");
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{company}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />

          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className='actions'>
          <Link className='btn btn-edit' to={`../edit-job/${_id}`}>Edit</Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
