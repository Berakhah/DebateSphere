const Sequelize = require('sequelize');

// Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true, // for local development
            trustedConnection: true // use this for Windows Authentication
        }
    },
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    },
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
