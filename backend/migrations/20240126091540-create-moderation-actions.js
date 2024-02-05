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
                    model: 'User', 
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
                onDelete: 'SET NULL',
                onUpdate: 'NO ACTION'
            },
            targetDebateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Debate',
                    key: 'debateId'
                },
                onDelete: 'SET NULL', 
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
