import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Product', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const { name, email, password } = await factory.create('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send({ name, email, password });

    const tokenResponse = await request(app)
      .post('/session')
      .send({ email, password });

    const { token } = tokenResponse.body;
    console.log(0, tokenResponse);
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/products')
      .set('Authorization', token)
      .send(product);

    expect(response.body).toHaveProperty('id');
  });
});
