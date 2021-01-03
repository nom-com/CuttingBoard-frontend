import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import LoginForm from "../components/LoginForm";
import Container from "@material-ui/core/Container";

const Landing = () => {
  const [authState, authDispatch] = useAuthContext();

  return (
    <div className='page-body-content' align="center">
        {authState.username ? (
          <div>Welcome back, {authState.username}</div>
        ) : (
          <LoginForm />
        )}
    </div>
  );
};

export default Landing;
