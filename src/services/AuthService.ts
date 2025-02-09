import type { RegisterData, RegisterResponseData } from "@/types/auth";
import request from "../utils/request";

class AuthService {
  static async register(data: RegisterData) {
    const response = await request.post<RegisterResponseData>("/auth/register", data);
    return response.data;
  }
}

export default AuthService;
