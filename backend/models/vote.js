const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Vote extends Model {}

    Vote.init({
        voteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        argumentId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Argument',
                key: 'argumentId'
            },
            onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'userId'
            },
            onDelete: 'CASCADE'
        },
        voteType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['upvote', 'downvote']] 
            }
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
    }, {
        sequelize,
        modelName: 'Vote',
        tableName: 'Vote', 
        timestamps: true 
    });

    Vote.associate = function(models) {
        Vote.belongsTo(models.Argument, {foreignKey: 'argumentId', as: 'argument'}); 
        Vote.belongsTo(models.User, {foreignKey: 'userId', as: 'user'}); 
        Vote.belongsTo(models.Debate, {foreignKey: 'debateId', as: 'debate'}); 

    };

    return Vote;
};
