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


  test('should return 200 status in signup call', async () => {
    const data = {
      email: 'lucas@gmail.com',
      name: 'lucas',
      password: '12345',
      passwordConfirm: '12345',

    };
    await supertest(app).post('/signup').send(data).expect(200)
        .then((res) => {
          expect(res.body.body.id).toBeTruthy();
          expect(res.body.body.name).toEqual(data.name);
          expect(res.body.body.email).toEqual(data.email);
        });
  });

  test('should return 200 status if email send with success', async () => {
    const data = {
      email: '1lucaslpa12345@gmail.com',
    };
    await supertest(app).post('/sendEmail').send(data).expect(200);
  });
});
