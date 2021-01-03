import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {SET_USER} from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import AuthService from "../services/auth.service";
import { useHistory } from 'react-router-dom'

const LoginForm = () => {

  //State Storage
  const [state, dispatch] = useStoreContext();
  //Temporary storage for the user form
  const [userForm, setUserForm] = useState({username: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();


    //Updated Login Function
    const handleLogin = (username, password) => {
        AuthService.login(username, password)
          .then(res => {
            console.log(res);
            res.status === 200 && AuthService.setCurrentUser({...res.data, accessToken: res.headers.token }) 
            res.status === 200 && dispatch({
              type: SET_USER,
              user: res.data
            });
            console.log(AuthService.getCurrentUser())
            history.replace("/");
          })
          .catch(err => {
              console.log(err);
              //Displays Error Message
              setErrorMessage("Incorrect Username or Password");
            });
      };

  //Invokes Login Helper Function
  const handleSubmit = (event) => {
    //Disables Page Reload onSubmit
    event.preventDefault();
    handleLogin(userForm.username, userForm.password);

    const handleFormUpdate = (event, value) => {
        setUserForm({...userForm, value: event.target.value})
    }
}
  return (
    <div id="login-form">
        <form>
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
        </form>
    </div>
  );
};

export default LoginForm;