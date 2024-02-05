'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModerationAction', {
      actionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      moderatorUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'userId',
        },
      },
      targetUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', 
          key: 'userId',
        },
      },
      targetDebateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Debate',
          key: 'debateId',
        },
      },
      targetContentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      contentType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actionType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModerationAction');
  },
};
