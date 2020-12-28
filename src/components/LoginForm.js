import React, {useState} from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER } from "../utils/actions";
import doLogin from "../utils/API";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const LoginForm = () => {

  //State Storage
  const [authState, authDispatch] = useAuthContext();
  //Temporary storage for the user form
  const [userForm, setUserForm] = useState({username: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /*authDispatch({ type: LOGIN_USER, username: authState.username, admin: false })*/
    doLogin.doLogin(userForm)
    .then (() => {
        authState.username = userForm.username;
        authDispatch({ type: LOGIN_USER, username: authState.username, admin: false});
        console.log("Login Successful");
    })
    .catch (() => {
        setErrorMessage("Incorrect Username or Password");
        console.log("Incorrect Username or Password");
    })

    const handleFormUpdate = (event, value) => {
        setUserForm({...userForm, value: event.target.value})
    }
}
  return (
    <Container>
        <form>
            <div id="login-form">
            <h1>Login</h1>
                {(errorMessage != "") ? (<div className="error-message">{errorMessage}</div>) : ""}
                <div className="form-group">
                    <TextField name="username" id="username" value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})}label="Username"/>
                </div>
                <div className="form-group">
                    <TextField type="password" name="password" id="password" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} label="Password"/>
                </div>
                <Button
                    onClick={handleSubmit}>
                    Login
                </Button>
            </div>
        </form>
      </Container>
  );
};

export default LoginForm;