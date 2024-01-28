'use strict';
module.exports = (sequelize, DataTypes) => {
  const Argument = sequelize.define('Argument', {
    argumentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    debateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Debate', // Ensure this is the correct name of your Debate model
        key: 'debateId'
      }
    },
    authorUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Ensure this is the correct name of your User model
        key: 'userId'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Argument',
    timestamps: true // Sequelize manages timestamp
  });

  Argument.associate = function(models) {
    // associations can be defined here
    Argument.belongsTo(models.User, {foreignKey: 'authorUserId', as: 'author', onDelete: 'SET NULL', onUpdate: 'CASCADE'});
    Argument.belongsTo(models.Debate, {foreignKey: 'debateId', as: 'debate', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  };

  return Argument;
};
