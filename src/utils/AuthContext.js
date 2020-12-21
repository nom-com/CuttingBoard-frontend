import React, { createContext, useReducer, useContext } from "react";
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from "./actions";

const AuthContext = createContext();
const { Provider } = AuthContext;

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        username: action.username,
        admin: action.admin,
        loading: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        username: null,
        admin: false,
        loading: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        username: action.username,
        loading: false,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(authReducer, {
    username: null,
    admin: false,
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
