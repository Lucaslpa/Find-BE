import {Express, json} from 'express';
import cors from 'cors';

export function midlewares(app : Express) {
  app.use(json());
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  return app;
}
