import type { BaseResponse } from "./common";
import type { User } from "./user";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterResponseData = BaseResponse<{
  token: string;
  user: User;
}>;

export type GetMeResponseData = BaseResponse<{
  user: User;
}>;
