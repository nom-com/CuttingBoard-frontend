import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class AmountService {
  /*
    Amount Service:
    
    GET, POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */

  getAmountById(id) {
    return axios.get(API_URL + "amount/id/" + id, {
      headers: authHeader(),
    });
  }
  postAmount(amountObj) {
    return axios.post(API_URL + "amount", amountObj, {
      headers: authHeader(),
    });
  }
  putAmountById(id, amountObj) {
    return axios.put(API_URL + "amount/" + id, amountObj, {
      headers: authHeader(),
    });
  }
  deleteById(id) {
    return axios.delete(API_URL + "amount/" + id, {
      headers: authHeader(),
    });
  }
}

export default new AmountService();
