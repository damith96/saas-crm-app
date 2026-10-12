export interface ICommonResponse<T> {
  status: "success" | "failed";
  message: string;
  data: T;
}
