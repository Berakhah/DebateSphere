// model/debate.js

const { Model, DataTypes } = require('sequelize');

class Debate extends Model {}

module.exports = (sequelize) => {
    Debate.init({
        debateId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'DebateID'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Title'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'Description'
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'DateTime'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Scheduled',
            field: 'Status'
        },
        topicCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'TopicCategory'
        },
        creatorUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'userId'
            },
            field: 'CreatorUserID'
        }
    }, {
        sequelize,
        modelName: 'Debate',
        tableName: 'Debate',
            timestamps: false, 
    indexes: [{ fields: ['creatorUserId'] }],
    });

    Debate.associate = (models) => {
        Debate.belongsTo(models.User, { foreignKey: 'creatorUserId', as: 'Creator' });
        Debate.hasMany(models.Argument, { foreignKey: 'debateId', as: 'Arguments' });
        Debate.hasMany(models.Vote, { foreignKey: 'debateId', as: 'Votes' });
        Debate.hasMany(models.Comment, { foreignKey: 'debateId', as: 'Comments' });
        Debate.belongsToMany(models.Category, { through: models.DebateCategory, foreignKey: 'debateId', otherKey: 'categoryId' }); // Correct association
    };
    return Debate;
};
