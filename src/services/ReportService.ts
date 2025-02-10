import request from "@/utils/request";
import type { ReportResponse } from "@/types/report";

class ReportService {
  static async read() {
    const response = await request.get<ReportResponse>(`/reports`);
    return response.data;
  }
}

export default ReportService;
