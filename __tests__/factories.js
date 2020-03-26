import { factory } from 'factory-girl';
import faker from 'faker';

import Product from '../src/app/models/Product';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productName(),
  price: faker.random.number({
    min: 10,
    max: 50,
  }),
});

export default factory;
