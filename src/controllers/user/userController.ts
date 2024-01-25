/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseMassages } from '../../common/constant';

class User {
  constructor(private readonly responseMassages: ResponseMassages) {}
  signUp = async (data: any) => {
    try {
      return { status: this.responseMassages.success, data: 'hello' };
    } catch (error: any) {
      return { status: this.responseMassages.success, data: error.message };
    }
  };
}

export const user = new User(new ResponseMassages());
