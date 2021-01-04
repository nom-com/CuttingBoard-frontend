import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import { SET_USER } from "../utils/actions";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";

const validationSchema = Yup.object().shape({
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
});

const SignUpForm = props => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const { username, email, firstName, lastName, password } = props;

  const checkUniqueUsername = (usernameTest, setFieldError, setStatus) => {
    if (usernameTest.length < 8) {
      setFieldError("username", "Username must contain at least 8 characters");
      return false;
    }
    AuthService.register(usernameTest)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data === "User already exists.") {
            setFieldError("username", "That username already exists.");
            return false;
          } else {
            setStatus({ username: "Looks good!" });
            return true;
          }
        }
      });
  };

  const signUpSubmit = (
    values,
    { setSubmitting, resetForm, setFieldError, setStatus }
  ) => {
    // USERNAME IS UNIQUE, FINALIZE CALL TO API
    AuthService.register(
      values.username,
      values.password,
      values.email,
      values.firstName,
      values.lastName
    )
      .then(res => {
        if (res.status === 201) {
          AuthService.login(values.username, values.password)
            .then(resTwo => {
              AuthService.setCurrentUser({
                ...resTwo.data,
                accessToken: resTwo.headers.token,
              });
              dispatch({
                type: SET_USER,
                user: resTwo.data,
              });
              history.replace("/");
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        // console.log(err);
        if (err.response) {
          if (err.response.data === "User already exists.") {
            setFieldError("username", "That username already exists.");
          }
          if (err.response.data === "Email already exists.") {
            setFieldError("email", "That email already exists.");
          }
          setSubmitting(false);
        }
      });
  };

  return (
    <div className='page-body-content'>
      <Formik
        initialValues={{
          username: username || "",
          email: email || "",
          firstName: firstName || "",
          lastName: lastName || "",
          password: password || "",
          confirmPassword: "",
        }}
        initialTouched={{
          username: false,
          email: false,
          firstName: false,
          lastName: false,
          password: false,
          confirmPassword: false,
        }}
        initialErrors={{
          username: false,
          email: false,
          firstName: false,
          lastName: false,
          password: false,
          confirmPassword: false,
        }}
        initialStatus={{
          username: false,
          email: false,
          firstName: false,
          lastName: false,
          password: false,
          confirmPassword: false,
        }}
        validationSchema={validationSchema}
        onSubmit={signUpSubmit}>
        {({
          values,
          touched,
          status,
          errors,
          handleChange,
          handleBlur,
          setFieldError,
          setStatus,
          isSubmitting,
        }) => (
          <Form noValidate autoComplete='off'>
            <Paper
              style={{
                maxWidth: 600,
                margin: "auto",
                marginTop: 30,
                padding: 20,
              }}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'>
                <Grid item>
                  <Typography variant='h2'>Create an Account</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 20 }} />
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
                      touched.username && status.username
                        ? status.username
                        : errors.username
                        ? errors.username
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
                    helperText={
                      touched.email && errors.email ? errors.email : " "
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
                <Grid item xs={12}>
                  <TextField
                    margin='dense'
                    size='small'
                    error={touched.firstName && Boolean(errors.firstName)}
                    id='firstName'
                    label='First Name'
                    value={values.firstName}
                    placeholder='Guy'
                    helperText={
                      touched.firstName && errors.firstName
                        ? errors.firstName
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
                    helperText={
                      touched.lastName && errors.lastName
                        ? errors.lastName
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
                    helperText={
                      touched.password && errors.password
                        ? errors.password
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
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
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
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
