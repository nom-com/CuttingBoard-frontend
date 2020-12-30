import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import LoginForm from "../components/LoginForm";
import Container from "@material-ui/core/Container";

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
