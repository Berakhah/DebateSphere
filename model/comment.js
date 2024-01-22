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
                model: 'Debates',
                key: 'debateId'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Comments'
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Comment.belongsTo(models.Debate, { foreignKey: 'debateId' });
    };
    return Comment;
};
