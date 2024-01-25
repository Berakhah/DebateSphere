'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Reports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            targetId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            reporterId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            reason: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            reviewed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Reports');
    }
};
