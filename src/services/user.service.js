import axios from "axios";
// import authHeader from "./auth-header";
import API_URL from "./api-url";

class UserService {
  /*
    User Service:
    
    Currently no use for authHeader, auth.service holds authentication.

  */

  // Not being used anywhere...yet
  getUsers() {
    return axios.get(API_URL + "user");
  }
}

export default new UserService();
