'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DebateCategories', {
      debateId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Debates',
          key: 'debateId'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'categoryId'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DebateCategories');
  }
};
