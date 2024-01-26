'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    debateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Debate',
        key: 'debateId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Comment',
        key: 'commentId'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comment',
    timestamps: true
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Debate, {foreignKey: 'debateId', as: 'debate', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'user', onDelete: 'NO ACTION', onUpdate: 'NO ACTION'});
    Comment.belongsTo(models.Comment, {foreignKey: 'parentId', as: 'parent', onDelete: 'NO ACTION', onUpdate: 'NO ACTION'});
  };

  return Comment;
};
