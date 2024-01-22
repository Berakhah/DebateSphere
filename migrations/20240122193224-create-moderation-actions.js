'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModerationActions', {
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
          model: 'Users',
          key: 'userId'
        }
      },
      targetUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId'
        }
      },
      targetDebateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Debates',
          key: 'debateId'
        }
      },
      actionType: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModerationActions');
  }
};
