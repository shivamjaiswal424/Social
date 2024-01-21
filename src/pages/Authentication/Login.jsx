import { Button } from '@mui/material';
import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from 'formik'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { email: "", password: "" };
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is Required"),
});


const Login = () => {
  const [formValue, setFormValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handle Submit", values);
    dispatch(loginUserAction({ data: values }))
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">

            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth type="submit"
              variant="contained"
              color="secondary">
              Login
            </Button>
          </div>

        </Form>
      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you don't have account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  )
}

export default Login;