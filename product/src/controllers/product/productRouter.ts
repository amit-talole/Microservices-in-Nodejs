import { Router } from 'express';
import { commonFunction } from '../../common/common';
import { product } from './productController';

const productRoute = Router();

productRoute.post('/product/add', commonFunction.isAuthenticated('login_user'), async (req, res) =>
  commonFunction.apiResponse(await product.addProduct(req.body, res.locals.tokenData?.id), res),
);
productRoute.get('/product/:id', commonFunction.isAuthenticated('login_user'), async (req, res) =>
  commonFunction.apiResponse(await product.getProductById(req.params), res),
);

export { productRoute };
