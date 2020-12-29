import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGOUT_USER } from "../utils/actions";
import Button from "@material-ui/core/Button";

const Logout = () => {
    const [authState, authDispatch] = useAuthContext();
    
    return (
        <Button onClick={() => authDispatch({ type: LOGOUT_USER })}>Logout</Button>
    )
}

export default Logout;