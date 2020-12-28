import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGOUT_USER } from "../utils/actions";
import 'fontsource-roboto';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const Logout = () => {
    const [authState, authDispatch] = useAuthContext();
    
    return (
        <Button onClick={() => authDispatch({ type: LOGOUT_USER })}>Logout</Button>
    )
}

export default Logout;