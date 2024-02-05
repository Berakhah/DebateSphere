'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModerationActions', {
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
          key: 'userId'
        }
      },
      targetUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'userId'
        },
        onDelete: 'SET NULL'
      },
      targetContentId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      contentType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      actionType: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModerationActions');
  }
};
