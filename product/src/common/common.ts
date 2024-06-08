/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { CommonFunctionInterface, apiResponseObject } from './interface';
import { ResponseStatus, ResponseMassages, Message } from './constant';
import { Response, Request, NextFunction } from 'express-serve-static-core';
import { compare, hash } from 'bcrypt';

class CommonFunction implements CommonFunctionInterface {
  constructor(
    private readonly responseStatus: ResponseStatus,
    readonly responseMassages: ResponseMassages,
    readonly message: Message,
  ) {}

  async verifyToken(token: string) {
    try {
      const jwtKey: string = process.env.JWTTOKEN || '';
      const decoded = await jwt.verify(token.replace('Bearer', '').replace('bearer', '').trim(), jwtKey);
      return { status: this.responseStatus.success, data: decoded };
    } catch (error: any) {
      return { status: this.responseStatus.error, data: error.message };
    }
  }

  async generateToken(
    payload: {
      name: string;
      email: string;
      roleType: string;
    },
    expiresIn = '2 days',
  ) {
    try {
      const jwtKey: string = process.env.JWTTOKEN || '';
      const token = await jwt.sign(payload, jwtKey, { expiresIn });
      return { status: this.responseStatus.success, data: token };
    } catch (error: any) {
      return { status: this.responseStatus.error, data: error.message };
    }
  }

  async hashPassword(data: any) {
    const saltRount = Number(process.env.SALTROUND);
    return await hash(data, saltRount);
  }

  async comparePassword(hashPassword: any, password: any) {
    const isPasswordValid = await compare(password, hashPassword);
    if (isPasswordValid) {
      return true;
    }
    return false;
  }

  validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

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

      if (status === this.responseStatus.fail) {
        statusCode = this.responseStatus.fail;
        statusMSG = message;
      }
      if (status === this.responseStatus.unauthorized) {
        statusCode = this.responseStatus.unauthorized;
        statusMSG = message;
      }
      if (status === this.responseStatus.error) {
        statusCode = this.responseStatus.error;
        statusMSG = message;
      }
      if (status === this.responseStatus.bad_request) {
        statusCode = this.responseStatus.bad_request;
        statusMSG = message;
      }
      if (status === this.responseStatus.not_found) {
        statusCode = this.responseStatus.not_found;
        statusMSG = message;
      }
      if (status === this.responseStatus.too_many_request) {
        statusCode = this.responseStatus.too_many_request;
        statusMSG = message;
      }
      if (status === this.responseStatus.success) {
        statusCode = this.responseStatus.success;
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
      if (status === this.responseStatus.fail) {
        return res.status(this.responseStatus.fail).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseStatus.unauthorized) {
        return res.status(this.responseStatus.unauthorized).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseStatus.error) {
        return res.status(this.responseStatus.error).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseStatus.bad_request) {
        return res.status(this.responseStatus.bad_request).json({
          status,
          message,
          data,
        });
      }
      if (status === this.responseStatus.not_found) {
        return res.status(this.responseStatus.not_found).json({
          status,
          message,
          data,
        });
      }
      return res.status(this.responseStatus.success).json({
        status,
        data,
        message,
      });
    }
  };

  isAuthenticated = (userType: string) => async (req: Request<any>, res: Response<any>, next: NextFunction) => {
    try {
      // NOTE: userType 1. developer_user 2. application_user 3.microservice
      if (!req.headers.authorization) {
        return this.apiResponse(
          {
            message: this.responseMassages.permission_denied,
            status: this.responseStatus.fail,
          },
          res,
        );
      }
      const token = req.headers.authorization;
      let status;
      let tokenData = '';
      if (userType === 'login_user') {
        const verifyResponse = await this.verifyToken(token);
        status = verifyResponse.status;
        tokenData = verifyResponse.data;
      }
      if (status !== this.responseStatus.success) {
        return this.apiResponse(
          {
            status: this.responseStatus.unauthorized,
            message: this.responseMassages.unauthorized,
          },
          res,
        );
      }
      res.locals.tokenData = tokenData;
    } catch (error) {
      const responseData = {
        status: this.responseStatus.unauthorized,
        message: this.responseMassages.invalid_token,
      };
      return this.apiResponse(responseData, res);
    }
    return next();
  };
}

export const commonFunction = new CommonFunction(new ResponseStatus(), new ResponseMassages(), new Message());
