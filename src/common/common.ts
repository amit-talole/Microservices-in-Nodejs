/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { CommonFunctionInterface, apiResponseObject } from './interface';
import { ResponseStatus, ResponseMassages, Message } from './constant';
import { Response } from 'express-serve-static-core';

class CommonFunction implements CommonFunctionInterface {
  constructor(
    private readonly responseStatus: ResponseStatus,
    readonly responseMassages: ResponseMassages,
    readonly message: Message,
  ) {}

  async verifyToken(token: string) {
    try {
      const jwtKey: string = process.env.JWTTOKEN || '';
      const decoded = jwt.verify(token, jwtKey);
      return { status: this.responseMassages.success, data: decoded };
    } catch (error: any) {
      return { status: this.responseMassages.error, data: error.message };
    }
  }

  async generateToken(payload: string) {
    try {
      const jwtKey: string = process.env.JWTTOKEN || '';
      const token = jwt.sign(payload, jwtKey);
      return { status: this.responseMassages.success, data: token };
    } catch (error: any) {
      return { status: this.responseMassages.error, data: error.message };
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiResponse = async ({ status, message, data }: apiResponseObject, res: Response<any>) => {
    try {
      let ip: any;
      let statusCode: number;
      let statusMSG: any;
      if (res.req.headers['x-real-ip'] || res.req.connection.remoteAddress) {
        ip = res.req.headers['x-real-ip'] || res.req.connection.remoteAddress;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ip = res.req.ip || '';
      }

      if (status === this.responseMassages.fail) {
        statusCode = 400;
        statusMSG = message;
      }
      if (status === this.responseMassages.unauthorized) {
        statusCode = 401;
        statusMSG = message;
      }
      if (status === this.responseMassages.error) {
        statusCode = 500;
        statusMSG = message;
      }
      if (status === this.responseMassages.bad_request) {
        statusCode = 400;
        statusMSG = message;
      }
      if (status === this.responseMassages.not_found) {
        statusCode = 404;
        statusMSG = message;
      }
      if (status === this.responseMassages.success) {
        statusCode = 200;
        statusMSG = message;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        statusCode = 500;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        statusMSG = message;
      }
    } catch (error: any) {
      return { status: this.responseMassages.error, message: error.message };
    } finally {
      if (status === this.responseMassages.fail) {
        return res.status(400).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseMassages.unauthorized) {
        return res.status(401).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseMassages.error) {
        return res.status(500).json({
          status,
          message: this.message.someting_went_wrong,
          data,
        });
      }
      if (status === this.responseMassages.bad_request) {
        return res.status(400).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseMassages.not_found) {
        return res.status(404).json({
          status,
          message,
          data,
        });
      }
      return res.status(200).json({
        status,
        data,
        message,
      });
    }
  };
}

export const commonFunction = new CommonFunction(new ResponseStatus(), new ResponseMassages(), new Message());
