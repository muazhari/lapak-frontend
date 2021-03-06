import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../api/AuthService";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authValues: { username: "", email: "", password: "" },
      isLoading: false,
    };
  }

  handleSubmit = (val) => {
    const { username, email, password } = val;

    this.setState({ isLoading: true });
    AuthService.handleRegister({ username, email, password })
      .then((res) => {
        this.props.history.replace("/auth/login");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleValidate = (val) => {
    const error = {};
    if (!val.username) {
      error.username = "Enter a username";
    }

    if (!val.email) {
      error.email = "Enter a email";
    }

    if (!val.password) {
      error.password = "Enter a password";
    }

    return error;
  };

  render() {
    const { authValues, isLoading } = this.state;
    return (
      <div className="container">
        <h1 className="mb-5">Register Page</h1>

        <div className="container d-md-flex justify-content-center flex-md-column w-50">
          {isLoading && (
            <div className="container alert alert-info">Loading</div>
          )}
          <Formik
            initialValues={authValues}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="mb-4">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                  />
                </fieldset>

                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="mb-4">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    className="form-control "
                  />
                </fieldset>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="mb-4">
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="text"
                    className="form-control"
                  />
                </fieldset>

                <button type="submit" className="btn btn-outline-primary mb-4">
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
