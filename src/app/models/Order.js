import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        address: Sequelize.STRING,
        price: Sequelize.INTEGER,
        deliveryFee: Sequelize.INTEGER,
        canceledAt: Sequelize.DATE,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Order;
