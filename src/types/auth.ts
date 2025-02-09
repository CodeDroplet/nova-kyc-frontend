import type { BaseResponse } from "./common";
import type { User } from "./user";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterResponseData = BaseResponse<{
  token: string;
  user: User;
}>;

export type { RegisterData, RegisterResponseData };
