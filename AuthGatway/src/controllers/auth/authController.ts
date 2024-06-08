/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseMassages, ResponseStatus, Message } from '../../common/constant';
import { AuthServices } from './authService';

class Auth {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly authServices: AuthServices,
    private readonly responseStatus: ResponseStatus,
  ) {}
  signUp = async (data: any) => {
    try {
      return await this.authServices.signUpAsync(data);
    } catch (error: any) {      
      return { status: this.responseStatus.error, message: error.message };
    }
  };

  login = async (data: any) => {
    try {
      return await this.authServices.loginAsync(data);
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };
}

export const auth = new Auth(
  new ResponseMassages(),
  new AuthServices(new ResponseMassages(), new Message(), new ResponseStatus()),
  new ResponseStatus(),
);
