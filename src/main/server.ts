import express from 'express';
import {midlewares} from './midlewares';
import routers from './routes/routes';
import connection from '../infra/db/ConnectionHelper';
const app = express();

midlewares(app);
app.use(routers);


connection.create().then(()=>{
  app.listen(2500, () => console.log('server running'));
});

export default app;
