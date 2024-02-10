import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import { Routes } from './routes/root';
import DbConnection from './middleware/database'

class App {
  public app: Application;
  public routerPrv: Routes = new Routes();
  public db: DbConnection = new DbConnection()

  constructor() {
    this.app = express();
    this.config();
    this.routerPrv.routes(this.app);
  }

  private async config(): Promise<void> {
    await this.app.use(express.json());
    await this.app.use(express.urlencoded({ extended: true }));
    await this.app.use((req: Request, res: Response, next: NextFunction) => {    
   res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    await this.db.mongodbConnection()
    await this.app.use(
    await cors({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        origin: config.clientOrigins[config.nodeEnv],
      }),
    );
    await this.app.use(helmet());
    await this.app.use(morgan('tiny'));
  }
}

export default new App().app;
