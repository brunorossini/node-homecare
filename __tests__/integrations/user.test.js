import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password whein new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await user.checkPassword('123456');

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to create session', async () => {
    const { name, email, password } = await factory.create('User', {
      email: 'mail@mail.zxc',
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
