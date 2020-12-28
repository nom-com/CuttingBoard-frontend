import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import API from "../utils/API";

const signUpSubmit = (
  values,
  { setSubmitting, resetForm, setFieldError, setStatus }
) => {
  setTimeout(() => {
    if (checkUniqueUsername(values.username, setFieldError, setStatus)) {
      // USERNAME IS UNIQUE, FINALIZE CALL TO API
      alert(JSON.stringify(values, null, 2));
      resetForm();
    } else {
      // USERNAME EXISTS STOP SUBMISSION DON"T CALL API
    }
    setSubmitting(false);
  }, 1000);
};

const checkUniqueUsername = (username, setFieldError, setStatus) => {
  // call API to check username return true or false
  // helper func
  if (username.length < 8) {
    setFieldError("username", "Username must contain at least 8 characters");
    return false;
  }

  if (username === "dansirdan") {
    setFieldError("username", "This username already exists.");
  } else {
    setStatus({ username: "Looks good!" });
    return true;
  }
  return false;
};

const SignUpForm = props => {
  const {
    values,
    touched,
    errors,
    status,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    setStatus,
  } = props;

  return (
    <div className='page-body-content'>
      <Paper>
        <form
          id='signup-form'
          style={{
            maxWidth: 600,
            margin: "auto",
            marginTop: 30,
            padding: 20,

          }}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Typography variant='h2'>Create an Account</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={touched.username && Boolean(errors.username)}
                id='username'
                label='Username'
                value={values.username}
                placeholder='foodie77'
                helperText={
                  touched.username && errors.username
                    ? errors.username
                    : status.username
                    ? status.username
                    : " "
                }
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
              <Grid container item justify='flex-end' alignItems='flex-end'>
                <Button
                  onClick={() =>
                    checkUniqueUsername(
                      values.username,
                      setFieldError,
                      setStatus
                    )
                  }
                  variant='outlined'
                  color='default'
                  endIcon={<Icon>check</Icon>}>
                  Check
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={touched.email && Boolean(errors.email)}
                id='email'
                label='Email'
                value={values.email}
                placeholder='diners.driveins@foodnetwork.net'
                helperText={touched.email && errors.email ? errors.email : " "}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={touched.firstName && Boolean(errors.firstName)}
                id='firstName'
                label='First Name'
                value={values.firstName}
                placeholder='Guy'
                helperText={touched.firstName && errors.firstName ? errors.firstName : " "}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={touched.lastName && Boolean(errors.lastName)}
                id='lastName'
                label='Last Name'
                value={values.lastName}
                placeholder='Fieri'
                helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={touched.password && Boolean(errors.password)}
                id='password'
                label='Password'
                value={values.password}
                type='password'
                placeholder=''
                helperText={touched.password && errors.password ? errors.password : " "}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                size='small'
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                id='confirmPassword'
                label='Confirm Password'
                value={values.confirmPassword}
                type='password'
                placeholder=''
                helperText={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : " "
                }
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </Grid>

            <Grid container item justify='flex-end' alignItems='flex-end'>
              <Button
                type='submit'
                variant='outlined'
                color='default'
                disabled={isSubmitting}
                endIcon={<Icon>send</Icon>}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

const UserAccountForm = withFormik({
  mapPropsToValues: ({
    username,
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
  }) => {
    return {
      username: username || "",
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
    };
  },
  mapPropsToStatus: ({ username }) => {
    return {
      username: username || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(8, "Username must contain at least 8 characters")
      .required("Enter a username"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  }),
  handleSubmit: signUpSubmit,
})(SignUpForm);

export default UserAccountForm;
