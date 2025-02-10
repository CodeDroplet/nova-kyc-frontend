import { type UsersResponseData } from "@/types/user";
import request from "@/utils/request";

class UserService {
  static async getUsers() {
    const res = await request.get<UsersResponseData>("/users");
    return res.data.data;
  }
}

export default UserService;
