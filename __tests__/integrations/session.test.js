import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create session', async () => {
    const { name, email, password } = await factory.create('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send({ name, email, password });

    const response = await request(app)
      .post('/session')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });
});
