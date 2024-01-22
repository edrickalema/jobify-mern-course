import React from "react";
import { useDashboardContext } from "./DashboardLayout";
import { FormRow, FormSelectRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  useOutletContext,
  Form,
  useNavigation,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../constants/constants";
import { toast } from "react-toastify";
import customFetch from "../customFetch";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    return error;
  }
};
function EditJob() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { data } = useLoaderData();
  const job = data.theJob;

  console.log(job);
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>

        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={`${job.jobLocation}`}
          />
          <FormSelectRow
            labelText='Job Status'
            name='jobStatus'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelectRow
            labelText='Job Type'
            name='jobType'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-block form-btn'
          >
            {isSubmitting ? "Editing ..." : "Edit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;
