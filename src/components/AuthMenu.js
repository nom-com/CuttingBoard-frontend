import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreContext } from "../utils/GlobalState";
import LogoutModal from "./LogoutModal";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import {
  ExitToApp,
  VpnKey,
  PermIdentity,
  Close,
} from "@material-ui/icons";

export default function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(false);

  const [state, dispatch] = useStoreContext();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuthChoice = () => {
    setAnchorEl(null);
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Button
        aria-controls='auth-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        <ExpandMoreIcon />
        Account
      </Button>
      {state.user ? (
        <Menu
          id='auth-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleAuthChoice}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Logout
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            Close
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id='auth-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem component={Link} to='/login' onClick={() => handleClose()}>
            <ListItemIcon>
              <VpnKey />
            </ListItemIcon>
            Login
          </MenuItem>
          <MenuItem component={Link} to='/signup' onClick={() => handleClose()}>
            <ListItemIcon>
              <PermIdentity />
            </ListItemIcon>
            Sign Up
          </MenuItem>
        </Menu>
      )}
      <LogoutModal
        showModal={show}
        handleModalClose={handleModalClose}
      />
    </div>
  );
}
