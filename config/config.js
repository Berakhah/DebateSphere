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
  "production": {
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
  }
};
