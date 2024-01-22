import React from "react";
import { useNavigation, Form, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";

import customFetch from "../customFetch";
import { FormRow } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("Image size is too large");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log(error);
  }

  return null;
};

function Profile() {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              select an image file (max 0.5 MB)
            </label>
            <input type='file' name='avatar' id='avatar' accept='image/*' />
          </div>
          <FormRow
            labelText='Name'
            type='text'
            defaultValue={name}
            name='name'
          />
          <FormRow
            labelText='Last Name'
            type='text'
            defaultValue={lastName}
            name='lastName'
          />
          <FormRow
            labelText='Email'
            type='text'
            defaultValue={email}
            name='email'
          />
          <FormRow
            labelText='location'
            type='text'
            defaultValue={location}
            name='location'
          />

          <button className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default Profile;
