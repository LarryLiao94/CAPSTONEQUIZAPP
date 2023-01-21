import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleGuestLogin = (e) => {
    e.preventDefault();

    return setEmail("demo@aa.io"), setPassword("password");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    history.push("/dashboard");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Auth-form-container" onSubmit={onLogin}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
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
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
