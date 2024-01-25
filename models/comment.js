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
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Comment'
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Comment.belongsTo(models.Debate, { foreignKey: 'debateId' });
    };
    return Comment;
};
