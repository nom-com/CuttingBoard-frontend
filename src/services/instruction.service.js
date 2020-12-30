import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./api-url";

class InstructionService {
  /*
    Instruction Service:
    
    All GET requests are public.
    POST, PUT, and DELETE require proper JWT Validation through authHeader service

  */

  // CONFIRM with BACKEND !! single instruction post? or array?
  postInstruction(instruction) {
    return axios.post(API_URL + "instruction", instruction, {
      headers: authHeader(),
    });
  }
}

export default new InstructionService();
