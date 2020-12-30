import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class ShoppingListService {
  /*
    Recipe Service:
    
    All GET requests are public.
    POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */
  // NO BACKEND CONTENT YET
  //   getAllIngredients() {
  //     return axios.get(API_URL + "ingredients");
  //   }
  //   getIngredientsByString(ingredientSearch) {
  //     return axios.get(API_URL + "ingredients/" + ingredientSearch);
  //   }
  //   getIngredientsById(ingredientId) {
  //     return axios.get(API_URL + "ingredients/id/" + ingredientId);
  //   }
  //   postIngredients(ingredient) {
  //     return axios.post(API_URL + "ingredients", ingredient, {
  //       headers: authHeader(),
  //     });
  //   }
  //   putIngredientById(ingredientId, ingredient) {
  //     return axios.put(API_URL + "ingredients/" + ingredientId, ingredient, {
  //       headers: authHeader(),
  //     });
  //   }
  //   deleteIngredientById(ingredientId) {
  //     return axios.delete(API_URL + "ingredients/" + ingredientId, {
  //       headers: authHeader(),
  //     });
  //   }
}

export default new ShoppingListService();
