import type { LoginData, RegisterData, RegisterResponseData } from "@/types/auth";
import request from "../utils/request";

class AuthService {
  static async register(data: RegisterData) {
    const response = await request.post<RegisterResponseData>("/auth/register", data);
    return response.data;
  }

  static async login(data: LoginData) {
    const response = await request.post<RegisterResponseData>("/auth/login", data);
    return response.data;
  }
}

export default AuthService;
