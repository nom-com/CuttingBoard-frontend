import React, { createContext, useReducer, useContext } from "react";
import {
  LOADING,
  GET_RECIPES,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  CREATE_RECIPE,
  GET_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
      };

    case GET_RECIPES:
      return {
        ...state,
      };

    case UPDATE_RECIPE:
      return {
        ...state,
      };
    case DELETE_RECIPE:
      return {
        ...state,
      };

    case CREATE_RECIPE:
      return {
        ...state,
      };

    case GET_SHOPPING_LIST:
      return {
        ...state,
      };

    case UPDATE_SHOPPING_LIST:
      return {
        ...state,
      };

    case CREATE_SHOPPING_LIST:
      return {
        ...state,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    username: null,
    admin: false,
    recipes: [],
    favorites: [],
    currentRecipe: {},
    shoppingList: [],
    loading: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
