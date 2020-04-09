import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'items',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Step, { foreignKey: 'step_id', as: 'step' });
  }
}

export default Item;
