import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [state, dispatch] = useStoreContext();
  
  return (
    <Route
      {...rest}
      render={routeProps =>
        state.user ? <Component {...routeProps} /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
