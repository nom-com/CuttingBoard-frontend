import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class IngredientService {
  /*
    Ingredient Service:
    
    GET, POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */

  getAllIngredients() {
    return axios.get(API_URL + "ingredients", {
      headers: authHeader(),
    });
  }
  getIngredientsByString(ingredientSearch) {
    return axios.get(API_URL + "ingredients/" + ingredientSearch, {
      headers: authHeader(),
    });
  }
  getIngredientsById(ingredientId) {
    return axios.get(API_URL + "ingredients/id/" + ingredientId, {
      headers: authHeader(),
    });
  }
  postIngredient(ingredient) {
    return axios.post(API_URL + "ingredients", ingredient, {
      headers: authHeader(),
    });
  }
  putIngredientById(ingredientId, ingredient) {
    return axios.put(API_URL + "ingredients/" + ingredientId, ingredient, {
      headers: authHeader(),
    });
  }
  deleteIngredientById(ingredientId) {
    return axios.delete(API_URL + "ingredients/" + ingredientId, {
      headers: authHeader(),
    });
  }
}

export default new IngredientService();
