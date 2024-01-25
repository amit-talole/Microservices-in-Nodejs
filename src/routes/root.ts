import { Application } from 'express';
import { userRoute } from '../controllers/user/userRouter';

export class Routes {
  public routes(app: Application): void {
    app.use('/', userRoute);
  }
}
