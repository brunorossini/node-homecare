import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Product', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/products')
      .send(product);

    expect(response.body).toHaveProperty('id');
  });
});
