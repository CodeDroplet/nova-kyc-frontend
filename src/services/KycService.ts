import request from "@/utils/request";
import type { KycRequestPayload, KycRequestResponse } from "@/types/kyc";

class KycService {
  static async request(data: KycRequestPayload) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("documentFront", data.documentFront);
    formData.append("documentBack", data.documentBack);

    const response = await request.post<KycRequestResponse>("/kyc/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async getMyRequest() {
    const response = await request.get<KycRequestResponse>("/kyc");
    return response.data;
  }

  static async getUserRequest(userId: number) {
    const response = await request.get<KycRequestResponse>(`/kyc/${userId}`);
    return response.data;
  }

  static async updateRequestStatus(userId: number, status: "approved" | "rejected") {
    const userRequest = await this.getUserRequest(userId);

    const response = await request.patch<KycRequestResponse>(
      `/kyc/${userRequest.data.kycRequest.id}`,
      {
        status,
      }
    );

    return response.data;
  }
}

export default KycService;
