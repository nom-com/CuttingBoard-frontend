import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useStoreContext } from "../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { UNSET_USER } from "../utils/actions";
import AuthService from "../services/auth.service";

const LogoutForm = ({ handleModalClose }) => {
  const history = useHistory();

  const [state, dispatch] = useStoreContext();

  const onFormSubmit = e => {
    e.preventDefault();

    AuthService.logout();
    dispatch({
      type: UNSET_USER,
    });

    handleModalClose();
    history.replace("/");
  };

  return (
    <form
      id='login-form'
      style={{ width: "80%" }}
      noValidate
      autoComplete='off'
      onSubmit={onFormSubmit}>
      <Grid
        direction='row'
        container
        justify='center'
        alignContent='center'
        spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4' component='h1'>
            Are you sure you want to logout{state.user? ", " + state.user.username : ""}?
          </Typography>
          <br />
          <Divider />
        </Grid>
        <Grid container item justify='flex-end' alignItems='center' spacing={2}>
          <Grid item>
            <Button
              type='submit'
              variant='outlined'
              color='default'
              endIcon={<Icon>check</Icon>}>
              Logout
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={handleModalClose}
              variant='outlined'
              color='default'
              endIcon={<Icon>close</Icon>}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LogoutForm;
