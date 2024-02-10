/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseMassages, ResponseStatus, Message } from '../../common/constant';
import { UserServices } from '../user/userService';

class User {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly userServices: UserServices,
    private readonly responseStatus: ResponseStatus,
  ) {}
  signUp = async (data: any) => {
    try {
      return await this.userServices.signUpAsync(data);
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };

  login = async (data: any) => {
    try {
      return await this.userServices.loginAsync(data);
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };
}

export const user = new User(
  new ResponseMassages(),
  new UserServices(new ResponseMassages(), new Message(), new ResponseStatus()),
  new ResponseStatus(),
);
