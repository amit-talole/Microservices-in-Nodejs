/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyTokenResponse } from './response-promise';

export interface apiResponseObject {
  status: number;
  data?: any;
  message: any;
}
export interface CommonFunctionInterface {
  verifyToken(token: string): Promise<verifyTokenResponse>;
}

export interface UserServicesInterface {
  getUserDetailOnEmail(data: any): Promise<apiResponseObject>;
}
