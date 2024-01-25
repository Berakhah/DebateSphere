const { Model, DataTypes } = require('sequelize');

class ModerationAction extends Model {}

module.exports = (sequelize) => {
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
                model: 'User', // This should match the model name
                key: 'userId'
            }
        },
        targetUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User', // This should match the model name
                key: 'userId'
            }
        },
        targetDebateId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Debate', // This should match the model name
                key: 'debateId'
            }
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
        tableName: 'ModerationAction' // Ensure this matches your actual SQL table name
    });

    return ModerationAction;
};
