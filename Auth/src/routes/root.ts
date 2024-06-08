import { Application } from 'express';
import { authRoute } from '../controllers/auth/authRouter';

export class Routes {
  public routes(app: Application): void {
    app.use('/', authRoute);
  }
}
