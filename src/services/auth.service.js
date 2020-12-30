import axios from "axios";
import API_URL from "./api-url";

class AuthService {
  login(username, password) {
    return axios.post(API_URL + "login", {
      username,
      password,
    });
    // HANDLE AT THE API CALL in components THEN call state-reducers
    //   .then(response => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }

    //     return response.data;
    //   });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password, email, firstName, lastName) {
    return axios.post(API_URL + "user", {
      username,
      password,
      email,
      firstName,
      lastName,
    });
  }

  setCurrentUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
