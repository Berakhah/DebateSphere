require('dotenv').config();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const tedious = require('tedious');

// Establishing connection to the database
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectModule: tedious,
        logging: console.log
    }
);

// Define the User model based on the migration script
const User = sequelize.define('User', {
    userId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: DataTypes.STRING,
    profileInformation: DataTypes.TEXT,
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verificationToken: DataTypes.STRING
}, {
    timestamps: true,
    tableName: 'User'
});

// Function to insert multiple users
async function insertUsers() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Syncing the model with the database, creating the table if it doesn't exist
        await User.sync();

        // Hash password
        const hashedPassword = await bcrypt.hash('qpassword123', 10);

        // Bulk create users
        await User.bulkCreate([
            { name: 'melese', email: 'melese@example.com', password: hashedPassword, role: 'superuser' }
        ]);

        console.log('Users inserted successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (error instanceof Sequelize.DatabaseError) {
            console.error('SQL Error:', error.parent); // More detailed SQL error
        }
    } finally {
        // Close the connection
        await sequelize.close();
    }
}

// Run the function
insertUsers();