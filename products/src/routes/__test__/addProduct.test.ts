import request from 'supertest';
import { app } from '../../app';

it('route handler listenig to /api/products for post request', async () => {
   const response = await request(app)
   .post('/api/products')
   .send({})

   expect(response.status).not.toEqual(404);
})

it('can only be access if the user is signed in', async () => {
  const response = await request(app)
   .post('/api/products')
   .send({})
   .expect(401)
})

it('status 401 even id user signed in', async () => {
   const response = await request(app)
   .post('/api/products')
   .send({})
   expect(response.status).not.toEqual(401);
})

it('error for invalid title', async () => {
  const response = await request(app)
   .post('/api/products')
   .send({})
  
})
it('error for invalid price', async () => {
  const response = await request(app)
   .post('/api/products')
   .send({})
  
})


it('creates a valid procduct', async () => {
  const response = await request(app)
   .post('/api/products')
   .send({})
  
})