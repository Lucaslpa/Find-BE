import supertest from 'supertest';
import app from '../../server';
import connection from '../../../infra/db/ConnectionHelper';
import faker from 'faker'

describe('Routes', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });

  beforeEach(async () => {
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

  test('should return 200 status if account update with success', async () => {
    const data = {
      password: 'uma senha qualquer a qual eu não',
    };
    await supertest(app).put('/editPassword?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5OSIsImVtYWlsIjoiMWx1Y2FzbHBhMTIzNDVAZ21haWwuY29tIiwiaWF0IjoxNjAyMTIyNTI5fQ.h1EBBPdr6RtYA_UVg3HcGTyQs9Vi6CGi5YeGXO2zSmI').send(data).expect(200);
  });
});
