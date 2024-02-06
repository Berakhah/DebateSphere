'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vote', {
      voteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      argumentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Argument', 
          key: 'argumentId'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        },
        onDelete: 'CASCADE'
      },
      debateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Debate',
            key: 'debateId'
        },
        onDelete: 'CASCADE'
    },
      voteType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vote');
  }
};
