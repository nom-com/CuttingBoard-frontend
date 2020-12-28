import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER, LOGOUT_USER } from "../utils/actions";
import LoginForm from "../components/LoginForm";
import Container from "@material-ui/core/Container";
import Logout from "../components/Logout";

const Landing = () => {

  const [authState, authDispatch] = useAuthContext();

  return (
    <Container>
      <div>
        {authState.username ? (
          <div>
            Welcome back, {authState.username}
          </div>
        ) : (
          <LoginForm/>
        )}
      </div>
    </Container>
  );
};

export default Landing;