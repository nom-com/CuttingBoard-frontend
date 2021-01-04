import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useStoreContext } from "../utils/GlobalState";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const Login = () => {
  const [state, dispatch] = useStoreContext();

  return (
    <div className='page-body-content' align='center'>
      <Container
        maxWidth='md'
        style={{
          padding: 20,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Paper style={{ padding: 20 }}>
            <Grid item>
              {state.user ? (
                <Typography variant='subtitle1'>
                  Welcome back, <b>{state.user.username}</b>
                </Typography>
              ) : (
                <LoginForm />
              )}
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
