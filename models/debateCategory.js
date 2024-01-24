const { Model, DataTypes } = require('sequelize');

class DebateCategory extends Model {}

module.exports = (sequelize) => {
    DebateCategory.init({
        id: { // Optional ID field, not strictly necessary for a junction table
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        debateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Debates', // Ensure this matches your Debate model table name
                key: 'debateId'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories', // Ensure this matches your Category model table name
                key: 'categoryId'
            }
        }
    }, {
        sequelize,
        modelName: 'DebateCategory',
        tableName: 'DebateCategories' // Ensure this matches your actual SQL table name
    });
    return DebateCategory;
};
