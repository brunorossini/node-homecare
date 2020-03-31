import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        price: Sequelize.INTEGER,
        note: Sequelize.STRING,
        createdAt: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'orders',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'receipt_id', as: 'receipt' });
  }
}

export default Order;
