import React from "react";
import Grid from "@material-ui/core/Grid";
import ListItemLink from "./ListItemLink";
import AuthMenu from "./AuthMenu";
import { useStoreContext } from "../utils/GlobalState";
import SideNav from "./SideNav";
import Box from "@material-ui/core/Box";

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  return (
    <Grid
      container
      direction='row'
      justify='space-between'
      alignItems='center'
      component='nav'
      p={5}>
      {state.user ? (
        <Grid item container direction='row' justify='flex-start' xs={8}>
          <Box display={{ xs: "inline", md: "none" }}>
            <SideNav />
          </Box>
          <Grid item>
            <ListItemLink to='/' primary='Cutting Board' />
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <ListItemLink to='/favorites' primary='Favorites' />
            </Box>
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <ListItemLink to='/shoppinglist' primary='Shopping List' />
            </Box>
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <ListItemLink to='/search' primary='Search' />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid item>
          <ListItemLink to='/' primary='Cutting Board' />
        </Grid>
      )}
      <Grid item>
        <AuthMenu />
      </Grid>
    </Grid>
  );
};

export default Nav;
