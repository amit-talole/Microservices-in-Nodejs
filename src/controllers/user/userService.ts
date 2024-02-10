/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from "../../model/user.model";
import {UserInterface} from '../../model/interface'
import { ResponseMassages , Message, ResponseStatus} from '../../common/constant';
import { commonFunction } from "../../common/common";

export class UserServices{
    constructor(private readonly responseMassages:ResponseMassages, private readonly message:Message, private readonly responseStatus:ResponseStatus){}

    signUpAsync = async(data:UserInterface)=> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {email,name, password} = data
            if (!email||!name||!password) {
                return { status: this.responseStatus.fail, message: this.message.invalidParameter };
            }
            const hashPassword = await commonFunction.hashPassword(password)
            const result= await new UserModel({
                name:name,
                email:email,
                password:hashPassword
            }).save()  
            if (result?._id) {
            const response = await commonFunction.generateToken({name,email})
            if (response.status === this.responseStatus.success) {
                return { status: this.responseStatus.success,message: this.responseMassages.success, data:{name:name,email:email,token:response.data}};
            }
            return { status: this.responseStatus.fail, message: this.message.someting_went_wrong };

        }
        return { status: this.responseStatus.fail, message: this.message.someting_went_wrong };
        } catch (error:any) {
            console.log("e",error);
            
            return { status: this.responseStatus.error, message: error.message,};

        }
    }
}

