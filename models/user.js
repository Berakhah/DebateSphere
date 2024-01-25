// model/user.js
const User = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        profileInformation: DataTypes.TEXT,
        verified: DataTypes.BOOLEAN,
        verificationToken: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'User' // Ensure this matches your actual SQL table name
    });
};
module.exports = User;
