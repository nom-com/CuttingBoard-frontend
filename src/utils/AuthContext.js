import React, { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const authReducer = (authState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...authState,
        username: action.username,
        admin: action.admin,
        loading: false,
      };

    case "LOGOUT_USER":
      return {
        ...authState,
        username: null,
        admin: false,
        loading: false,
      };

    case "UPDATE_USER":
      return {
        ...authState,
        username: action.username,
        loading: false,
      };

    default:
      return authState;
  }
};

const AuthProvider = ({ value = [], ...props }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    username: null,
    admin: false,
    loading: false
  });

  return <Provider value={[authState, authDispatch]} {...props} />;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
