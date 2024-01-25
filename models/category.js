const { Model, DataTypes } = require('sequelize');

class Category extends Model {}

module.exports = (sequelize) => {
    Category.init({
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Category' 
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.Debate, { through: models.DebateCategory, foreignKey: 'categoryId', otherKey: 'debateId' });
    };
    return Category;
};
