import React from "react";
import Button from "@material-ui/core/Button";
import AuthService from "../services/auth.service";
import { useStoreContext } from "../utils/GlobalState";
import {UNSET_USER} from "../utils/actions";

const Logout = () => {
    const [state, dispatch] = useStoreContext();
    
    const handleLogout = () => {
        AuthService.logout();
        dispatch({
          type: UNSET_USER
        });
      }

    return (
        <Button onClick={() => handleLogout}>Logout</Button>
    )
}

export default Logout;