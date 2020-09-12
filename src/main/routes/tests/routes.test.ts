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
    const data = {
      email: 'lucas@gmail.com',
      name: 'lucas',
      password: '12345',
      passwordConfirm: '12345',

    };
    await supertest(app).post('/signup').send(data).expect(200)
        .then((res) => {
          expect(res.body.account.id).toBeTruthy();
          expect(res.body.account.name).toEqual(data.name);
          expect(res.body.account.email).toEqual(data.email);
        });
  });
});
