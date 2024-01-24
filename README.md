
# Project Setup Guide

This guide provides instructions for setting up the development environment for our Node.js and React application on both Windows and Linux systems.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (10.x or higher)
- npm (6.x or higher) or yarn

## Setup Instructions

### Windows

1. Save the following script as `setup.bat` in your project root directory.
2. Run the script by double-clicking on it or executing it from the command prompt.

```batch
@echo off
SETLOCAL ENABLEEXTENSIONS

:: Set the project directory
SET projectDir=%~dp0

:: Navigate to the project directory
cd %projectDir%

:: Install global dependencies
npm install -g create-react-app

:: Initialize a new React project (skip if already done)
:: create-react-app my-app

:: Navigate into your project directory (adjust the name as necessary)
cd my-app

:: Install project dependencies
npm install express bcrypt cors dotenv body-parser express-rate-limit express-validator jsonwebtoken nodemailer passport passport-jwt sequelize socket.io

:: Copy .env example (adjust the path to your .env file)
copy path\to\your\.env.example path\to\your\.env

:: Start the development server
npm start

echo Setup completed!
ENDLOCAL
```

### Linux

1. Save the following script as `setup.sh` in your project root directory.
2. Make the script executable with `chmod +x setup.sh` and run it using `./setup.sh`.

```bash
#!/bin/bash

# Define the project directory
projectDir=$(pwd)

# Install global dependencies
sudo npm install -g create-react-app

# Initialize a new React project (skip if already done)
# create-react-app my-app

# Navigate into your project directory (adjust the name as necessary)
cd my-app || exit

# Install project dependencies
npm install express bcrypt cors dotenv body-parser express-rate-limit express-validator jsonwebtoken nodemailer passport passport-jwt sequelize socket.io

# Copy .env example (adjust the path to your .env file)
cp path/to/your/.env.example path/to/your/.env

# Start the development server
npm start

echo "Setup completed!"
```

## Additional Information

- Replace `my-app` with the name of your project.
- Adjust paths to `.env.example` and `.env` as necessary for your project structure.
- These scripts are a starting point. Customize them as needed for your project requirements.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/yourusername/yourprojectname/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
