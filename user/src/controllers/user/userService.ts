/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from '../../model/user.model';
import { ResponseMassages, Message, ResponseStatus } from '../../common/constant';
import { apiResponseObject } from '../../common/interface';

export class UserServices {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly message: Message,
    private readonly responseStatus: ResponseStatus,
  ) {}

  async getUserDetailOnEmailAsync(data:any):Promise <apiResponseObject>{
   try {
    const {email} = data    
    if (!email?.trim()) {
      return{
        status:this.responseStatus.bad_request,
        message:this.message.invalidParameter
      }
    }
    const findUser = await UserModel.findOne({ email: email });
    if (findUser?.id) {
      return { status: this.responseStatus.success, message: this.responseMassages.success , data:{email:findUser.email,name:findUser.name,roleType:findUser.roleType}};
    }
    return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
   } catch (error:any) {
    return { status: this.responseStatus.error, message: error.message };

   } 
  }
}
