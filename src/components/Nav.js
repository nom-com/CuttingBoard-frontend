import React from "react";
import Grid from "@material-ui/core/Grid";
import ListItemLink from "../components/ListItemLink";
// import AuthMenu from "../components/AuthMenu";
// import { authContext } from "../contexts/AuthContext";

const Nav = () => {
  //   const { auth } = useContext(authContext);
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
    </Grid>
  );
};

export default Nav;
