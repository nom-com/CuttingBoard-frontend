import React from "react";
import Grid from "@material-ui/core/Grid";
import ListItemLink from "../components/ListItemLink";
// import AuthMenu from "../components/AuthMenu";
// import { authContext } from "../contexts/AuthContext";
import { useAuthContext } from "../utils/AuthContext";
import Logout from "../components/Logout";

const Nav = () => {
  const [authState, authDispatch] = useAuthContext();
  return (
    <Grid
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
      p={5}>
      <Grid item>
        <ListItemLink to='/' primary='Home' />
      </Grid>
      <Grid item>
        <ListItemLink to='/recipe/12' primary='Recipe' />
      </Grid>
      <Grid item>
        <ListItemLink to='/search' primary='Search' />
      </Grid>
      {authState.username ? (
        <React.Fragment>
          {authState.admin ? (
            <Grid item>
            <ListItemLink to='/admin' primary='Admin' />
          </Grid>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <Grid item>
            <ListItemLink to='/favorites' primary='Favorites' />
          </Grid>
          <Grid item>
            <ListItemLink to='/user-account' primary='User Account' />
          </Grid>
          <Grid item>
            <Logout />
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>

        <Grid item>
          <ListItemLink to='/login' primary='Login' />
        </Grid>
              <Grid item>
              <ListItemLink to='/signup' primary='Signup' />
            </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

export default Nav;
