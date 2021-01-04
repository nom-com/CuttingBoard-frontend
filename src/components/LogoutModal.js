import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import LogoutForm from "./LogoutForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 25,
  },
  paper: {
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    outline: "none",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      width: "80%",
    },
  },
}));

const LogoutModal = (props) => {
  const classes = useStyles();
  const { showModal, handleModalClose } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showModal}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <div className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid container item justify="flex-end" xs={12}>
              <IconButton
                edge="end"
                onClick={handleModalClose}
                color="inherit"
                size="medium"
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} container justify="center" alignContent="center">
              <LogoutForm handleModalClose={handleModalClose}/>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default LogoutModal;
