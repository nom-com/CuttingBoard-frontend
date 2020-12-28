import axios from "axios";

export default {
  /* baseURL: "http://",
  
    TODO create API Object methods
    
    doLogin: function(loginObj) {
        return axios.post(this.baseURL + "/login", loginObj )
    }
    */

   doLogin: async function (userData) {
     return await new Promise((resolve, reject) => {
       //Simulate server request speed with 200ms ping
      setTimeout(() => {
        //Dummy Data for Testing until Back-end is finished
        if (userData.username === "a" && userData.password === "a")
        {
          resolve();
        }
        else
        {
          reject();
        }
      }, 200)
     })
  }
};
