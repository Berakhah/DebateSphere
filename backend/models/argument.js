// models/argument.js
module.exports = (sequelize, DataTypes) => {
  const Argument = sequelize.define('Argument', {
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
    }
  }, {
    tableName: 'Argument'
  });

  Argument.associate = function(models) {
    Argument.belongsTo(models.Debate, {
      foreignKey: 'debateId',
      as: 'debate'
    });
    Argument.belongsTo(models.User, {
      foreignKey: 'authorUserId',
      as: 'author'
    });
  };

  return Argument;
};
