import React, { createContext, useReducer, useContext } from "react";
import {
  SET_USER,
  UNSET_USER,
  LOADING,
  SET_RECOMMENDED_RECIPES,
  SET_RECIPES,
  SET_CURRENT_RECIPE,
  UNSET_CURRENT_RECIPE,
  SET_RECIPE_DETAIL,
  UNSET_RECIPE_DETAIL,
  SET_INGREDIENTS,
  UNSET_INGREDIENTS,
  SET_INSTRUCTIONS,
  UNSET_INSTRUCTIONS,
  SET_FAVORITES,
  SET_SHOPPING_LIST,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case UNSET_USER:
      return {
        ...state,
        user: null
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SET_RECOMMENDED_RECIPES:
      return {
        ...state,
        recommendedRecipes: action.recipes
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      };
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: action.recipe
      };
    case UNSET_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: null
      };
    case SET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.recipeDetail
      };
    case UNSET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: null
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      };
    case UNSET_INGREDIENTS:
      return {
        ...state,
        ingredients: []
      };
    case SET_INSTRUCTIONS:
      return {
        ...state,
        instructions: action.instructions
      };
    case UNSET_INSTRUCTIONS:
      return {
        ...state,
        instructions: []
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
        loading: false
      };
    case SET_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: action.shoppingList,
        loading: false
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    recommendedRecipes: [],
    recipes: [],
    currentRecipe: null,
    recipeDetail: null,
    ingredients: [],
    instructions: [],
    favorites: [],
    shoppingList: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
