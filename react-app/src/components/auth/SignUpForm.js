import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Auth-form-container" onSubmit={onSignUp}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              className="form-control mt-1"
              placeholder="Enter Name"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="repeat_password"
              value={updateRepeatPassword}
              onChange={repeatPassword}
              required={true}
            />
          </div>
          {errors.map((error, ind) => (
            <div
              key={ind}
              className="invalid-feedback"
              style={{
                display: "block",
              }}
            >
              {error}
            </div>
          ))}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="text-center mt-2">
            <small>Already have an account? <a href="/login">Sign in here!</a></small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
