/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiResponseObject, UserServicesInterface } from 'src/common/interface';
import { ResponseMassages, ResponseStatus, Message } from '../../common/constant';
import { UserServices } from '../user/userService';

class User implements UserServicesInterface {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly userServices: UserServices,
    private readonly responseStatus: ResponseStatus,
  ) {}
  getUserDetailOnEmail = async(data:any) :Promise <apiResponseObject> =>{
    try {
      return await this.userServices.getUserDetailOnEmailAsync(data);
    } catch (error:any) {
      return { status: this.responseStatus.error, message: error.message };

    }
  }
  getUserDetailOnId = async(data:any) :Promise <apiResponseObject> =>{
    try {
      return await this.userServices.getUserDetailOnIdAsync(data);
    } catch (error:any) {
      return { status: this.responseStatus.error, message: error.message };

    }
  }
}

export const user = new User(
  new ResponseMassages(),
  new UserServices(new ResponseMassages(), new Message(), new ResponseStatus()),
  new ResponseStatus(),
);
