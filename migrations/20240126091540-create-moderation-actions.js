'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModerationAction', {
      actionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moderatorUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      targetUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      targetDebateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Debate',
          key: 'debateId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      actionType: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModerationAction');
  }
};
