import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class ShoppingListService {
  /*
    Recipe Service:
    
    All GET requests are public.
    POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */
  setCurrentList(shoplist) {
    localStorage.setItem("shopping-list", JSON.stringify(shoplist));
  }
  getCurrentList() {
    return JSON.parse(localStorage.getItem("shopping-list"));
  }
  getShoppingList() {
    return axios.get(API_URL + "shoppinglist", {
      headers: authHeader(),
    });
  }
  getShoppingListById(id) {
    return axios.get(API_URL + "shoppinglist/id/" + id, {
      headers: authHeader(),
    });
  }
  postShoppingList(shoppingListObj) {
    return axios.post(API_URL + "shoppinglist", shoppingListObj, {
      headers: authHeader(),
    });
  }
  deleteShoppingListById(id) {
    return axios.delete(API_URL + "shoppinglist/" + id, {
      headers: authHeader(),
    });
  }
}

export default new ShoppingListService();
