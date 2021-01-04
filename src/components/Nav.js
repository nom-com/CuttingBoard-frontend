import React from "react";
import Grid from "@material-ui/core/Grid";
import ListItemLink from "./ListItemLink";
import AuthMenu from "./AuthMenu";
import { useStoreContext } from "../utils/GlobalState";
import SideNav from "./SideNav";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

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
            <Link to={"/"}>
              <img
                alt='Home Nav'
                src='./images/cutboard.png'
                style={{ maxHeight: 55 }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <Link to={"/favorites"}>
              <img
                alt='Favorites Nav'
                src='./images/favorites.png'
                style={{ maxHeight: 55 }}
              />
            </Link>
            </Box>
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <Link to={"/shoppinglist"}>
              <img
                alt='Shopping List Nav'
                src='./images/shoplist.png'
                style={{ maxHeight: 55 }}
              />
            </Link>
            </Box>
          </Grid>
          <Grid item>
            <Box display={{ xs: "none", md: "block" }}>
              <Link to={"/search"}>
              <img
                alt='Search Nav'
                src='./images/search.png'
                style={{ maxHeight: 55 }}
              />
            </Link>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid item>
          <Link to={"/"}>
          <img
                alt='cutting board logo'
                src='./images/cutboard.png'
                style={{ maxHeight: 55 }}
              />
          </Link>
        </Grid>
      )}
      <Grid item>
        <AuthMenu />
      </Grid>
    </Grid>
  );
};

export default Nav;
