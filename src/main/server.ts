import express from 'express';
import {midlewares} from './midlewares';
import routers from './routes/routes';

const app = express();

midlewares(app);
app.use(routers);


app.listen(2500, () => console.log('server running'));

export default app;
