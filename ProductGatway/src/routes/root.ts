import { Application } from 'express';
import { productRoute } from '../controllers/product/productRouter';

export class Routes {
  public routes(app: Application): void {
    app.use('/', productRoute);
  }  
}
