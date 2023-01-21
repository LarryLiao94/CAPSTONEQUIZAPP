import "./LandingPage.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const loggedSession = useSelector((state) => state.session.user);
  return (
    <div className="landing_page">
      <div className="row align-items-center g-0">
        <div className="col-12 col-xl-6">
          <div className="left">
            <div className="headings">
              <h2>Take Your Quiz</h2>
              <h1>Please Login and Sign Up</h1>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-6">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
