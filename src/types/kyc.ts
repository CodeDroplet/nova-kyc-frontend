import type { BaseResponse } from "./common";

export type KycRequest = {
  id: number;
  name: string;
  email: string;
  documentFront: string;
  documentBack: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export type KycRequestPayload = {
  name: string;
  email: string;
  documentFront: File;
  documentBack: File;
};

export type KycRequestResponse = BaseResponse<{
  kycRequest: KycRequest;
}>;
