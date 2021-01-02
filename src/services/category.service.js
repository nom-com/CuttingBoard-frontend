import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class CategoryService {
  /*
    Category Service:
    
    GET, POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */

  getAllCategories() {
    return axios.get(API_URL + "category", {
      headers: authHeader(),
    });
  }
  getCategoryByName(name) {
    return axios.get(API_URL + "category/" + name, {
      headers: authHeader(),
    });
  }
  getCategoryById(id) {
    return axios.get(API_URL + "category/id/" + id, {
      headers: authHeader(),
    });
  }
  postCategory(categoryObj) {
    return axios.post(API_URL + "category", categoryObj, {
      headers: authHeader(),
    });
  }
}

export default new CategoryService();
