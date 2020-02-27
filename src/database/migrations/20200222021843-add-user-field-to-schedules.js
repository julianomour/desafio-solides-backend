module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('schedules', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => queryInterface.removeColumn('schedules', 'user_id'),
};
