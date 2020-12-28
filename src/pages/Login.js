import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER, LOGOUT_USER } from "../utils/actions";
import LoginForm from "../components/LoginForm";
import Container from "@material-ui/core/Container";
import Logout from "../components/Logout";

const Landing = () => {
  const [authState, authDispatch] = useAuthContext();

  return (
    <div className='page-body-content'>
      <Container>
        {authState.username ? (
          <div>Welcome back, {authState.username}</div>
        ) : (
          <LoginForm />
        )}
      </Container>
    </div>
  );
};

export default Landing;
