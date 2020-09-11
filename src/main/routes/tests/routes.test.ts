import supertest from 'supertest';
import app from '../../server';
import connection from '../../../infra/db/ConnectionHelper';


describe('Routes', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });


  test('should return 200 status in signup call', async () => {
    const res = await supertest(app).get('/signup');


    expect(res.status).toBe(200);
  });
});
