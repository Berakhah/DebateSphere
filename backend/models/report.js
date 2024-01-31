module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Debate', 'Comment']]
            },
        },
        targetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reporterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        issueType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Harassment', 'Spam', 'Inappropriate Content', 'Other']]
            }
        },
        reviewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'Report',
        timestamps: true,
    });

    return Report;
};
