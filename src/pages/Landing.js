import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER, LOGOUT_USER } from "../utils/actions";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";

const Landing = () => {

  const [authState, authDispatch] = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      {authState.username ? (
        <div>Welcome back, {authState.username}</div>
      ) : (
        <LoginForm/>
      )}
      {authState.username ? (
        /*<button onClick={() => authDispatch({ type: LOGOUT_USER })}>Logout</button>*/
        <Logout/>
      ) : (
        <button
          onClick={() =>
            authDispatch({ type: LOGIN_USER, username: "Test", admin: false })
          }>
          Old Test Login
        </button>
      )}
    </div>
  );
};

export default Landing;
