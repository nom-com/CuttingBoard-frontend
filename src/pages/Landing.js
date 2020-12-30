import React from "react";
import { useAuthContext } from "../utils/AuthContext";

const Landing = () => {
  const [authState, authDispatch] = useAuthContext();

  return (
    <div className='page-body-content'>
      <h1>Home</h1>
      {authState.username ? (
        <div>Welcome back, {authState.username}</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      {authState.username ? (
        <button onClick={() => authDispatch({ type: "LOGOUT_USER" })}>
          Logout
        </button>
      ) : (
        <button
          onClick={() =>
            authDispatch({ type: "LOGIN_USER", username: "Test", admin: true })
          }>
          Login
        </button>
      )}
    </div>
  );
};

export default Landing;
