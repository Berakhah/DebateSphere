'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Argument', {
      argumentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      debateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Debate',
          key: 'debateId'
        },
        onDelete: 'CASCADE'
      },
      authorUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId'
        },
        onDelete: 'NO ACTION'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Argument');
  }
};
