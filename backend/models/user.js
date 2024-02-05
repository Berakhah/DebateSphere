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
        isBanned: { type: DataTypes.BOOLEAN, defaultValue: false },
        isSuspended: { type: DataTypes.BOOLEAN, defaultValue: false },
        warningCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    }, {
        timestamps: false,
        tableName: 'User' 
    });
};
module.exports = User;
