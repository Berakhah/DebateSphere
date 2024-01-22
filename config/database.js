const Sequelize = require('sequelize');

// Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    },
    dialectOptions: {
        options: {
            encrypt: true, // for Azure SQL
            trustServerCertificate: true // for local development
        }
    }
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
