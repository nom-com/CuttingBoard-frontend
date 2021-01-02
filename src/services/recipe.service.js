import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class RecipeService {
  /*
    Recipe Service:
    
    All GET requests are public.
    POST, PUT, and DELETE require proper JWT Validation through authHeader service
  */
  getAllRecipes() {
    return axios.get(API_URL + "recipe", {
      headers: authHeader(),
    });
  }
  getAllRecommendedRecipes() {
    return axios.get(API_URL + "recipe/recommended");
  }
  getRecipeById(id){
    return axios.get(API_URL + "recipe/id/" + id, {
      headers: authHeader(),
    });
  }
  getRecipeBySearch(searchString){
    return axios.get(API_URL + "recipe/" + searchString, {
      headers: authHeader(),
    });
  }
  getRecipeByCategoryId(id){
    return axios.get(API_URL + "recipe/category/" + id, {
      headers: authHeader(),
    });
  }
  postRecipe(recipeObj) {
    return axios.post(API_URL + "recipe", recipeObj, {
      headers: authHeader(),
    });
  }
  putRecipeById(recipeId, recipe) {
    return axios.put(API_URL + "recipe/" + recipeId, recipe, {
      headers: authHeader(),
    });
  }
  deleteRecipeById(recipeId) {
    return axios.delete(API_URL + "recipe/" + recipeId, {
      headers: authHeader(),
    }) 
  }
}

export default new RecipeService();
