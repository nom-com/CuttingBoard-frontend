import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {
  validateEmail,
  validateFirstname,
  validateLasname,
  validatePassword,
  validateUsername,
} from "../utils/form-validations";

const SignUpUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    admin: false,
  });

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);

  const handleOnChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    switch (e.target.id) {
      case "username":
        setUsernameError(false);
        break;
      case "password":
        setPasswordError(false);
        break;
      case "email":
        setEmailError(false);
        break;
      case "firstname":
        setFirstnameError(false);
        break;
      case "lastname":
        setLastnameError(false);
        break;

      default:
        break;
    }
  };

  const handleOnSubmit = e => {};

  return (
    <div className='page-body-content'>
      <Paper>
        <form
          id='signup-form'
          style={{
            width: "80%",
            margin: "auto",
            marginTop: 30,
            padding: 20,
          }}
          noValidate
          autoComplete='off'
          onSubmit={handleOnSubmit}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
                <Typography variant="h2" gutterBottom>
                    Create an Account
                </Typography>
                <Divider/>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default SignUpUserForm;
