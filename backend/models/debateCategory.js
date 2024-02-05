const { Model, DataTypes } = require('sequelize');

class DebateCategory extends Model {}

module.exports = (sequelize) => {
    DebateCategory.init({
        id: { 
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Category', 
                key: 'categoryId'
            }
        }
    }, {
        sequelize,
        modelName: 'DebateCategory',
        tableName: 'DebateCategory' 
    });
    return DebateCategory;
};
