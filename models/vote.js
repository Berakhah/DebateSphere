module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {
        voteId: {
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
        voteType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Vote'
    });

    Vote.associate = (models) => {
        Vote.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Vote.belongsTo(models.Debate, { foreignKey: 'debateId' });
    };
    
    return Vote;
};
