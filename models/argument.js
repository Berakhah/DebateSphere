module.exports = (sequelize, DataTypes) => {
    const Argument = sequelize.define('Argument', {
        argumentId: {
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
        authorUserId: {
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
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'Arguments'
    });

    Argument.associate = (models) => {
        Argument.belongsTo(models.User, { foreignKey: 'authorUserId', as: 'Author' });
        Argument.belongsTo(models.Debate, { foreignKey: 'debateId' });
    };
    
    return Argument;
};
