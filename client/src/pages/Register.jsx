import React from "react";
import { Link, redirect, Form, useNavigation } from "react-router-dom";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../customFetch";
import { toast } from "react-toastify";
// import FormRow from '../components/FormRow';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = await Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Successfully registered");
    return redirect("/login");
  } catch (error) {
    const errorMessage = error?.response?.data?.message?.toString();

    console.log(errorMessage);
    toast.error(errorMessage);
    return error;
  }
};
function Register() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>

        <FormRow name='name' type='text' defaultValue='alema' id='name' />
        <FormRow
          labelText='Last Name'
          name='lastName'
          type='text'
          defaultValue=''
          id='last name'
        />
        <FormRow
          name='email'
          type='email'
          defaultValue=''
          id='email'
        />
        <FormRow
          name='location'
          type='text'
          defaultValue='location'
          id='location'
        />
        <FormRow
          name='password'
          type='password'
          defaultValue=''
          id='password'
        />
        {/* <FormRow name='name' type='text' defaultValue='name' id='name' /> */}

        <button className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? "Submitting ..." : "Submit"}
        </button>

        <p>
          Already a member?{" "}
          <Link to='/login' className='member-btn'>
            {" "}
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Register;
