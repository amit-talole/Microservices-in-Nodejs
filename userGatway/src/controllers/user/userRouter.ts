import { Router } from 'express';
import { commonFunction } from '../../common/common';
import { user } from './userController';

const userRoute = Router();

userRoute.get('/user',commonFunction.isAuthenticated('login_user'), async(req,res)=> commonFunction.apiResponse(await user.getUserDetailOnEmail(res.locals.tokenData),res))
userRoute.get('/user/:id',commonFunction.isAuthenticated('login_user'), async(req,res)=> commonFunction.apiResponse(await user.getUserDetailOnId(req.params),res))

export { userRoute };
