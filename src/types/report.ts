import type { BaseResponse } from "./common";

export type Report = {
  totalUsers: number;
  approvedKYC: number;
  rejectedKYC: number;
  pendingKYC: number;
};

export type ReportResponse = BaseResponse<Report>;
