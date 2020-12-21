import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER, LOGOUT_USER } from "../utils/actions";

const Landing = () => {
  const [state, dispatch] = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      {state.username ? (
        <div>Welcome back, {state.username}</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      {state.username ? (
        <button onClick={() => dispatch({ type: LOGOUT_USER })}>Logout</button>
      ) : (
        <button
          onClick={() =>
            dispatch({ type: LOGIN_USER, username: "Test", admin: false })
          }>
          Login
        </button>
      )}
    </div>
  );
};

export default Landing;
