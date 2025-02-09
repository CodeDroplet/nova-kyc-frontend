export type BaseResponse<T> = {
  status: "error" | "success";
  data: T;
};
