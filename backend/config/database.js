const Sequelize = require('sequelize');
require('dotenv').config(); 

const config = require('./config.js')[process.env.NODE_ENV || 'development'];


const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mariadb', 
    dialectOptions: config.dialectOptions,
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    },
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to MariaD has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the MariaDB database:', err);
    });

module.exports = sequelize;
