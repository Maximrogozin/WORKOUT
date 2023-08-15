/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import SignUp from "../components/ui/SignUp";
import SignIn from "../components/ui/SignIn";
import { useParams } from "react-router-dom";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = (params) => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <SignUp />
              <p>
                Already have account?{" "}
                <a role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <SignIn />
              <p>
                Don't have account?{" "}
                <a role="button" onClick={toggleFormType}>
                  {" "}
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
