/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from '../../model/user.model';
import { UserInterface, loginInterface } from '../../model/interface';
import { ResponseMassages, Message, ResponseStatus } from '../../common/constant';
import { commonFunction } from '../../common/common';

export class AuthServices {
  constructor(
    private readonly responseMassages: ResponseMassages,
    private readonly message: Message,
    private readonly responseStatus: ResponseStatus,
  ) {}

  signUpAsync = async (data: UserInterface): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, name, password } = data;
      if (!email || !name || !password) {
        return { status: this.responseStatus.fail, message: this.message.invalidParameter };
      }
      const validateEmail = await commonFunction.validateEmail(email);
      if (!validateEmail) {
        return { status: this.responseStatus.fail, message: this.message.emailAdressNotValid };
      }
      const checkUnique = await UserModel.findOne({ email: email });
      if (checkUnique?._id) {
        return { status: this.responseStatus.fail, message: this.message.emailAlradyRegistered };
      }
      const hashPassword = await commonFunction.hashPassword(password);
      const result :any = await new UserModel({
        name: name,
        email: email,
        password: hashPassword,
        roleType:'login_user'
      }).save();
      if (result?._id) {
        const response = await commonFunction.generateToken({ name, email, roleType: 'login_user', id: result?._id});
        if (response.status === this.responseStatus.success) {
          return {
            status: this.responseStatus.success,
            message: this.responseMassages.success,
            data: { name: name, email: email, token: response.data },
          };
        }
        return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
      }
      return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  };

  async loginAsync(data: loginInterface): Promise<any> {
    const { email, password } = data;
    try {
      const getUser :any = await UserModel.findOne({ email: email });
      if (getUser?._id) {
        const validatePassword = await commonFunction.comparePassword(getUser.password, password);
        if (validatePassword) {
          const name = getUser.name;
          const response = await commonFunction.generateToken({ name, email, roleType: 'login_user' , id: getUser._id});
          if (response.status === this.responseStatus.success) {
            return {
              status: this.responseStatus.success,
              message: this.responseMassages.success,
              data: { name: name, email: email, token: response.data },
            };
          }
          return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
        }
        return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
      }

      return { status: this.responseStatus.fail, message: this.responseMassages.bad_request };
    } catch (error: any) {
      return { status: this.responseStatus.error, message: error.message };
    }
  }
}
