'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ModerationAction', {
            actionId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            moderatorUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'User', // Note: Sequelize often pluralizes table names, adjust accordingly
                    key: 'userId'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            },
            targetUserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'User',
                    key: 'userId'
                },
                onDelete: 'SET NULL', // Adjust according to your business logic
                onUpdate: 'NO ACTION'
            },
            targetDebateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Debate', // Adjust according to your table name
                    key: 'debateId'
                },
                onDelete: 'SET NULL', // Adjust according to your business logic
                onUpdate: 'NO ACTION'
            },
            actionType: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ModerationAction');
    }
};
