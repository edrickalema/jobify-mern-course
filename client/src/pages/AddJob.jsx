import React from "react";
import { useDashboardContext } from "./DashboardLayout";
import { FormRow, FormSelectRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  useOutletContext,
  Form,
  useNavigation,
  redirect,
} from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../constants/constants";
import { toast } from "react-toastify";
import customFetch from "../customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);
  try {
    await customFetch.post("/jobs", data);
    toast.success("job created succesfully");
    return redirect("all-jobs");
  } catch (error) {
    const errorMessage = error?.response?.data?.message.toString();
    toast.error(errorMessage);
    return error;
  }
};
function AddJob() {
  const { user } = useOutletContext();
  const navigate = useNavigation();

  const isSubmittting = navigate.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>

        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={`${user.location}`}
          />
          <FormSelectRow
            labelText='Job Status'
            name='jobStatus'
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelectRow
            labelText='Job Type'
            name='jobType'
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type='submit'
            disabled={isSubmittting}
            className='btn btn-block form-btn'
          >
            {isSubmittting ? "Submiting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default AddJob;
