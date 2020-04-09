import Sequelize, { Model } from 'sequelize';

class Step extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        min: Sequelize.INTEGER,
        max: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'steps',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Item, {
      onDelete: 'cascade',
      hooks: true,
    });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Step;
