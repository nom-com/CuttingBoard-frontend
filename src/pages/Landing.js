import React from "react";
import RecipeGlanceFrame from "../components/RecipeGlanceFrame";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useStoreContext } from "../utils/GlobalState";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const [state, dispatch] = useStoreContext();

  return (
    <div className='page-body-content'>
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
            {state.user ? (
              <React.Fragment>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  item>
                  <Grid item>
                    <Typography variant='subtitle1'>
                      Welcome back, <b>{state.user.username}</b>
                    </Typography>
                    <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  item
                  spacing={2}>
                  <Grid item>
                    <NavLink
                      to={"/favorites"}
                      style={{ textDecoration: "none" }}>
                      <Button variant='outlined'>View Favorites</Button>
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink
                      to={"/new-recipe"}
                      style={{ textDecoration: "none" }}>
                      <Button variant='outlined'>Add a Recipe</Button>
                    </NavLink>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item>
                  <Typography variant='h2' component='h1' align='center'>
                    Cutting Board
                  </Typography>
                  <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1' gutterBottom>
                    Bored of eating the same old foods, night after night?
                    <br />
                    New to cooking and eager to learn beginner-friendly recipes?
                    <br />
                    Try discovering something new with{" "}
                    <strong>Cutting Board</strong>!<br />
                    <p />
                    Whether you're a Seasoned Chef, or just cutting your teeth
                    in the world of cooking,
                    <br />
                    Cutting Board makes learning new recipes a piece of cake!
                    <br />
                    <p />
                    Our large and easy to use library of recipes allows you to
                    not only learn,
                    <br />
                    but also create countless recipes of your own design!
                    <br />
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='center'>
                    <Grid item>
                      <NavLink to='/signup' style={{ textDecoration: "none" }}>
                        <Button variant='outlined'>Join Today</Button>
                      </NavLink>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Paper>
          <Grid item xs={12} md={12}>
            <RecipeGlanceFrame />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Landing;
