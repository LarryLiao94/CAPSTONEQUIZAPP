import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import QuizBuilder from "./components/QuizBuilder";
import LandingPage from "./components/LandingPage";
import Category from "./components/Category";
import QuestionBuilder from "./components/QuestionBuilder";
import SingleQuestion from "./components/SingleQuestion";
import "./App.css";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import EditQuiz from "./components/EditQuiz";
import Profile from "./components/Profile";
import EditQuestion from "./components/EditQuestion";
import Footer from "./components/Footer";

const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {user && <NavBar />}
          <Switch>
            {user ? (
              <Route path={["/login", "/sign-up", "/"]} exact={true}>
                {({ history }) => {
                  history.push("/dashboard");
                  return null;
                }}
              </Route>
            ) : (
              <>
                <Route path="/login" exact={true}>
                  <LoginForm />
                  <Footer />
                </Route>
                <Route path="/sign-up" exact={true}>
                  <SignUpForm />
                  <Footer />
                </Route>
                <Route path="/" exact={true}>
                  <LandingPage />
                  <Footer />
                </Route>
              </>
            )}
            <Route path="/quiz/edit/:id" exact={true}>
              <EditQuiz />
            </Route>
            <Route path="/quiz/:id" exact={true}>
              <Quiz />
            </Route>
            <Route path="/categories/:id">
              <Category />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
              <Footer />
            </Route>
            <Route exact path="/quiz">
              <QuizBuilder />
            </Route>
            <Route path="/questions/new" exact>
              <QuestionBuilder />
            </Route>
            <Route path="/question/edit/:id" exact={true}>
              <EditQuestion />
            </Route>
            <Route path="/profile">
              <Profile />
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;


