import React from "react";
import { redirect } from "react-router-dom";
import customFetch from "../customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    console.log(error);
  }

  return redirect("/dashboard/all-jobs");
};
function DeleteJob() {
  return <div>DeleteJob</div>;
}

export default DeleteJob;
