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
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        targetUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'userId'
            },
            onDelete: 'SET NULL',
            onUpdate: 'NO ACTION'
        },
        targetDebateId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Debate',
                key: 'debateId'
            },
            onDelete: 'SET NULL', 
            onUpdate: 'NO ACTION'
        },
        actionType: {
            type: DataTypes.STRING(50),
            allowNull: false
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
