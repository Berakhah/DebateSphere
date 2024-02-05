const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ModerationAction extends Model {}

    ModerationAction.init({
        actionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        moderatorUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        targetUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'userId'
            },
            onDelete: 'SET NULL'
        },
        targetContentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        contentType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        actionType: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'ModerationAction',
        tableName: 'ModerationAction'
    });

    return ModerationAction;
};
