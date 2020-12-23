import React, {useState} from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGIN_USER } from "../utils/actions";
import doLogin from "../utils/API";

const LoginForm = () => {

  //State Storage
  const [authState, authDispatch] = useAuthContext();
  //Temporary storage for the user form
  const [userForm, setUserForm] = useState({username: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");

  return (
      <form>
        <div id="login-form">
            <h1>Login</h1>
            {(errorMessage != "") ? (<div className="error-message">{errorMessage}</div>) : ""}
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})}/>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
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
                }}>
                Login
            </button>
        </div>
      </form>
  );
};

export default LoginForm;