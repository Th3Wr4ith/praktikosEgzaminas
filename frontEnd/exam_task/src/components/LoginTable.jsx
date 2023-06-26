import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function LoginTable() {
  const handleLogin = (values) => {
    // Perform login logic here
    console.log('Logging in...');
    console.log(values);
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
          initialValues={{ username: '', password: '' }}
          validate={(values) => {
            const errors = {};

            if (!values.username) {
              errors.username = 'Username is required';
            }

            if (!values.password) {
              errors.password = 'Password is required';
            }

            return errors;
          }}
          onSubmit={handleLogin}
        >
          <Form style={{ width: '100%' }}>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="username">Username:</label>
              <Field type="text" id="username" name="username" style={inputStyle} />
              <ErrorMessage name="username" component="div" />
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" style={inputStyle} />
              <ErrorMessage name="password" component="div" />
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