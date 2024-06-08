import { Router } from 'express';
import { commonFunction } from '../../common/common';
import { auth } from './authController';

const authRoute = Router();

authRoute.post('/register', async (req, res) => commonFunction.apiResponse(await auth.signUp(req.body), res));
authRoute.post('/login', async (req, res) => commonFunction.apiResponse(await auth.login(req.body), res));

export { authRoute };
