import type { BaseResponse } from "./common";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  kycRequestsStatus?: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type UsersResponseData = BaseResponse<User[]>;
