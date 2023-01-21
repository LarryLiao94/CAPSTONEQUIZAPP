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
import "./App.css";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
        <Route path="/quiz/:id">
          <Quiz />
        </Route>
        <Route path="/categories/:id">
          <Category />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/quiz">
          <QuizBuilder />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar/index';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
// import { authenticate } from './store/session';
// import Quiz from './components/Quiz';
// import Dashboard from './components/Dashboard';
// import QuizBuilder from './components/QuizBuilder'
// import LandingPage from './components/LandingPage';
// import Category from './components/Category';
// import Questions from './components/Question';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function App() {
//   const [loaded, setLoaded] = useState(false);
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const isAuthenticated = useSelector((state) => state.session.authenticated);

//   useEffect(() => {
//     (async() => {
//       await dispatch(authenticate());
//       setLoaded(true);
//     })();
//   }, [dispatch]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       history.push("/dashboard");
//     }
//   }, [isAuthenticated, history]);

//   useEffect(() => {
//     (async() => {
//       await dispatch(authenticate());
//       setLoaded(true);
//     })();
//   }, [dispatch]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <BrowserRouter>
//       <NavBar />
//       <Switch>
//         <Route path='/login' exact={true}>
//           <LoginForm />
//         </Route>
//         <Route path='/sign-up' exact={true}>
//           <SignUpForm />
//         </Route>
//         <ProtectedRoute path='/users' exact={true} >
//           <UsersList/>
//         </ProtectedRoute>
//         <ProtectedRoute path='/users/:userId' exact={true} >
//           <User />
//         </ProtectedRoute>
//         <Route path='/' exact={true} >
//           <LandingPage />
//         </Route>
//         <Route path='/quiz/:id'>
//           <Quiz />
//         </Route>
//         <Route path='/dashboard'>
//           <Dashboard />
//         </Route>
//         <Route path='/quiz/new'>
//           <QuizBuilder />
//         </Route>
//         <Route path='/categories/:id'>
//           <Category />
//         </Route>
//         <Route path='/questions'>
//           <Questions />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;
