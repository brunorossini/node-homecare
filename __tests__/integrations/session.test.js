import axios from 'axios';
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create session', async () => {
    const user = await factory.create('User', {
      email: 'mail@mail.zxc',
      password: '123456',
    });

    const response = await request(app).get('/alive');

    await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toBe(1);
  });
});
