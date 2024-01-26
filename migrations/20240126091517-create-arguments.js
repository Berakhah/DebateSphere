'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Argument', {
      argumentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      debateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Debate',
          key: 'debateId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      authorUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Argument');
  }
};
