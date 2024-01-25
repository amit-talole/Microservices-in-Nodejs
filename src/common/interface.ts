/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyTokenResponse } from './response-promise';

export interface apiResponseObject {
  status: string;
  data?: any;
  message?: any;
}
export interface CommonFunctionInterface {
  verifyToken(token: string): Promise<verifyTokenResponse>;
  generateToken(payload: string): Promise<verifyTokenResponse>;
}
