export interface IErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
