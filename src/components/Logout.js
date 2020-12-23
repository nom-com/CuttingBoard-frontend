import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import { LOGOUT_USER } from "../utils/actions";

const Logout = () => {
    const [authState, authDispatch] = useAuthContext();
    
    return (
        <button onClick={() => authDispatch({ type: LOGOUT_USER })}>Logout</button>
    )
}

export default Logout;