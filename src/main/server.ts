import {midlewares} from './midlewares';
import routers from './routes/routes';
import connection from '../infra/db/ConnectionHelper';
import cors from 'cors';
import express from 'express';
const app = express();

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(routers);


connection.create().then(()=>{
  app.listen(2500, () => console.log('server running'));
});

export default app;
