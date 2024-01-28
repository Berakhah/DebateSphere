require('dotenv').config(); // at the top of the file

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mssql",
    "dialectOptions": {
      "options": {
        "encrypt": true, // Set to true if using Azure SQL or similar
        "enableArithAbort": true
      }
    }
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mssql",
    "dialectOptions": {
      "options": {
        "encrypt": true, // Set to true if using Azure SQL or similar
        "enableArithAbort": true
      }
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mssql",
    "dialectOptions": {
      "options": {
        "encrypt": true, // Set to true if using Azure SQL or similar
        "enableArithAbort": true
      }
    }
  }
};
