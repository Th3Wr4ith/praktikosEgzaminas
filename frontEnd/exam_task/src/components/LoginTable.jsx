import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginTable = ({ handleLogin }) => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",

  }; const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    if (values.username === "admin" && values.password === "admin") {
      navigate("/adminpage");
    } else if (values.username === "user" && values.password === "user") {
      navigate("/userpage");
    } else {
      alert("Invalid username or password");
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  };

  const formStyle = {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    border: 'none',
    color: 'white',
    height: '50px',
    width: '25%',
    borderRadius: '10px',
    padding: '0px 20px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: '100%' }}>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="username">Username:</label>
              <Field type="text" id="username" name="username" style={inputStyle} />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" style={inputStyle} />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" style={buttonStyle}>
              <h3>Login</h3>
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginTable;