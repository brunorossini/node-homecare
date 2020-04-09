module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('steps', 'product_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('steps', 'product_id');
  },
};
