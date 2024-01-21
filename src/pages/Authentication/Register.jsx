import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from 'formik'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { firstName:"",lastName:"",email: "", password: "",gender:""};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
});


const Register = () => {
  const [gender, setGender] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (values) => {
    values.gender=gender;
    console.log("handle Submit", values);
    dispatch(registerUserAction({data:values}))
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5 ">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500" />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500" />
            </div>
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
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <RadioGroup
              onChange={handleChange}
              row
              aria-label="gender"
              name="gender"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <ErrorMessage name="gender" component="div" className="text-red-500" />
            </RadioGroup>

          </div>
          <Button
            sx={{ padding: ".8rem 12rem" }}
            fullwidth type="submit"
            variant="contained"
            color="secondary">
            Register
          </Button>
        </Form>
      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you have account?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  )
}

export default Register;