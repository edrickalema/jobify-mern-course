import React from "react";
import { Logo, FormRow } from "../components";
import { Link, useNavigation, redirect, Form } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import customFetch from "../customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("logged in successfully");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message.toString());
    return error;
  }
};
function Login() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4>Login</h4>
        <Logo />
        <FormRow
          type='email'
          name='email'
          labelText='email'
          defaultValue=''
          id='email'
        />
        <FormRow
          type='password'
          name='password'
          labelText='password'
          defaultValue=''
          id='password'
        />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? " Submitting ..." : " Submit"}
        </button>
        {/* <button type='button' className='btn btn-block'>
          Explore App
        </button> */}

        <p>
          Not a member yet?{" "}
          <Link to='/register' className='register-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;
