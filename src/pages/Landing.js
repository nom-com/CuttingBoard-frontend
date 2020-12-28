import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER, LOGOUT_USER } from "../utils/actions";

const Landing = () => {

  const [authState, authDispatch] = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      {authState.username ? (
        <div>Welcome back, {authState.username}</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      {authState.username ? (
        <button onClick={() => authDispatch({ type: LOGOUT_USER })}>Logout</button>
      ) : (
        <button
          onClick={() =>
            authDispatch({ type: LOGIN_USER, username: "Test", admin: false })
          }>
          Login
        </button>
      )}
    </div>
  );
};

export default Landing;