import React from "react";
import RecipeGlanceFrame from "../components/RecipeGlanceFrame";
import AuthService from "../services/auth.service";
import { useStoreContext } from "../utils/GlobalState";
import {SET_USER, UNSET_USER} from "../utils/actions";
import { Link } from "react-router-dom";

const Landing = () => {
  const [state, dispatch] = useStoreContext();

  // UPDATED HANDLE LOGIN & LOGOUT EXAMPLE
  const handleLogin = (username, password) => {
    AuthService.login(username, password)
      .then(res => {
        console.log(res);
        res.status === 200 && AuthService.setCurrentUser({...res.data, accessToken: res.headers.token }) 
        res.status === 200 && dispatch({
          type: SET_USER,
          user: res.data
        });
        console.log(AuthService.getCurrentUser())
      })
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch({
      type: UNSET_USER
    });
  }

  return (
    <div className='page-body-content'>
      <h1>Home</h1>
      {state.user ? (
        <div>Welcome back, {state.user.username}</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      {state.user ? (
        <button onClick={() => handleLogout()}>
          Logout
        </button>
      ) : (
        <button onClick={() => handleLogin("basicuser", "password")}>
          Login
        </button>
      )}
      <RecipeGlanceFrame />
      <Link to="/new-recipe">
        new-recipe
      </Link>
    </div>
  );
};

export default Landing;
