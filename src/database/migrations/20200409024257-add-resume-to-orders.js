module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'resume', {
      type: Sequelize.JSONB,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'resume');
  },
};
