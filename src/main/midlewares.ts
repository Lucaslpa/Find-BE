import {Express, json} from 'express';
import cors from 'cors';

export function midlewares(app : Express) {
  app.use(json());
  app.use(cors());
  return app;
}
