import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItemLink from "./ListItemLink";
import Divider from "@material-ui/core/Divider";
import { IconButton } from "@material-ui/core";

// TODO REVIEW STYLES
const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    // marginRight: theme.spacing(5),
  },
}));

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <React.Fragment>
      <IconButton
        edge={false}
        className={classes.menuButton}
        onClick={toggleDrawer(true)}
        color='inherit'
        aria-label='menu'>
        <MenuIcon />
      </IconButton>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        <div
          className={classes.root}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <List component='nav' aria-label='burger menu nav'>
            <ListItemLink to='/favorites' primary='Favorites' />
            <Divider />
            <ListItemLink to='/shoppinglist' primary='Shopping List' />
            <Divider />
            <ListItemLink to='/search' primary='Search' />
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
