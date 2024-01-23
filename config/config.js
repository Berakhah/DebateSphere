require('dotenv').config(); // at the top of the file

module.exports = {
  "development": {
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mssql",
    "dialectOptions": {
      "options": {
        "encrypt": true,
        "enableArithAbort": true,
        "trustedConnection": true
      }
    }
  },
  "test": {
    // Similar configuration for test environment
  },
  "production": {
    // Similar configuration for production environment
  }
};
