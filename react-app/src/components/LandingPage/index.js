import "./LandingPage.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import avatar from "./images/avatar.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 0",
  },
  heading1: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  heading2: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  testimonial: {
    textAlign: "left",
    marginTop: "2rem",
    paddingLeft: "12%",
    paddingRight: "12%",
    color: "white",
  },
});

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="landing_page">
      <div className="row align-items-center g-0">
        <div className="col-12 col-xl-6">
          <div className="left">
            <div className="left_headings">
              <h1>Your New Favorite Study Tool</h1>
              <h2>Eat, Sleep, Quiz, Repeat</h2>
            </div>
            <div className={classes.root}>
              <Box
                className={classes.testimonial}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={avatar}
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography variant="body1">
                    "This quiz app helped me increase my GPA by 2 points. I was
                    able to study efficiently and effectively for my exams."
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={avatar}
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography variant="body1">
                    "I passed my certification exam on the first try thanks to
                    this app. It's user-friendly and helped me stay organized
                    with my study materials."
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={avatar}
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography variant="body1">
                    "I highly recommend this app to anyone looking to improve
                    their study habits and increase their chances of success."
                  </Typography>
                </div>
              </Box>
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div className="right">
          <div className="right_headings">
            <h1>Still not convinced?</h1>
            <h2>Create an Account and See For Yourself!</h2>
          </div>

          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
