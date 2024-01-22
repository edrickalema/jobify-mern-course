import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

function PageButtonContainer() {
  const { data } = useAllJobsContext();
  const { numOfPages, cureentPage } = data.data;

  const buttons = Array.from({ length: numOfPages }, (_, i) => {
    return i + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(search);
    params.set("page", page);

    navigate(`${pathname}/?${params}`);
  };
  return (
    <Wrapper>
      <button className='betn prev-btn'>
        prev
        <HiChevronDoubleLeft />
      </button>
      <div className='btn-container'>
        {buttons.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === cureentPage && "active"
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='btn next-btn'>
        <HiChevronDoubleRight />
        Next
      </button>
    </Wrapper>
  );
}

export default PageButtonContainer;
