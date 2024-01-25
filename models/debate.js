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
            defaultValue: 'Scheduled', // Possible values: Scheduled, Active, Completed, Cancelled
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
                model: 'User', // This should match the table name exactly
                key: 'userId'
            },
            field: 'CreatorUserID'
        }
    }, {
        sequelize,
        modelName: 'Debate',
        tableName: 'Debate', // Ensure this matches your actual SQL table name
        timestamps: false
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
