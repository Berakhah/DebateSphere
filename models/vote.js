'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    debateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Debate', // This is the table name
        key: 'debateId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // This is the table name
        key: 'userId'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    },
    voteType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vote',
    tableName: 'Vote',
    timestamps: true
  });

  Vote.associate = function(models) {
    Vote.belongsTo(models.Debate, {foreignKey: 'debateId'});
    Vote.belongsTo(models.User, {foreignKey: 'userId'});
  };

  return Vote;
};
