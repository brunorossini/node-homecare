import Sequelize from 'sequelize';

import Address from '../app/models/Address';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Product from '../app/models/Product';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, File, Product, Order, Address];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
