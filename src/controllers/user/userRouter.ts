import { Router } from 'express';
import { commonFunction } from '../../common/common';
import { user } from './userController';

const userRoute = Router();

userRoute.post('/user/signup', async (req, res) => commonFunction.apiResponse(await user.signUp(req.body), res));

export { userRoute };
