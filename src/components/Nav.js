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
        <ListItemLink to='/what' primary='404TEST' />
      </Grid>
      {authState.username ? (
        <Grid item>
          <Logout/>
        </Grid>
      ) : (
        <Grid item>
          <ListItemLink to='/login' primary='Login' />
        </Grid>
      )
      }
    </Grid>
  );
};

export default Nav;
