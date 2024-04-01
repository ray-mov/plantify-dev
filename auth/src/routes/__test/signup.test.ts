import request  from "supertest";

import { app } from "../../app";

it('returns 201 on signup success', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'testpassword',
  }).expect(201);
});

it('returns 400 on signup : invalid email', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'testtest.com',
    password: 'testpassword',
  }).expect(400);
})

it('returns 400 on signup : missing email and password', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: '',
    password: '',
  }).expect(400);
})

it('returns 400 on signup : invalid password', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'testtest.com',
    password: '123',
  }).expect(400);
})