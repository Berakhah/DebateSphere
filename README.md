# DebateSphere: Project Setup Guide

Welcome to the setup guide for DebateSphere, a robust platform built with Node.js and React for engaging online debates. This document outlines the steps necessary to prepare your development environment on both Windows and Linux operating systems.

## Prerequisites

Before commencing the setup, please ensure the following tools are installed on your system:
- **Node.js**: Version 10.x or higher [Download Node.js](https://nodejs.org/)
- **npm**: Version 6.x or higher (comes installed with Node.js) or **yarn** [Install Yarn](https://yarnpkg.com/)

## Setup Instructions

### Windows Setup

To automate the setup process on Windows, follow these steps:

1. **Script Preparation**:
   - Create a new file named `setup.bat` in the root directory of your project.
2. **Script Execution**:
   - Run the script by either double-clicking on it or executing it from the command prompt.

#### `setup.bat` Content:

```batch
@echo off
echo Preparing DebateSphere environment...
git clone https://github.com/Berakhah/DebateSphere.git
cd DebateSphere

echo Configuring environment variables...
copy .env.example .env
REM Reminder: Please update the .env file with your custom configurations.

echo Installing necessary dependencies...
npm install bcrypt@5.1.1 bcryptjs@2.4.3 body-parser@1.20.2 cors@2.8.5 date-fns@3.3.1 dotenv@16.3.2 express-rate-limit@7.1.5 express-validator@7.0.1 express@4.18.2 jest@29.7.0 jsonwebtoken@9.0.2 moment@2.30.1 mongoose@8.1.0 morgan@1.10.0 mssql@10.0.2 nodemailer@6.9.8 passport-jwt@4.0.1 passport-local@1.0.0 passport@0.7.0 qrcode@1.5.3 sequelize-cli@6.6.2 sequelize@6.35.2 socket.io@4.7.4 speakeasy@2.0.0 supertest@6.3.4 tedious@16.6.1

echo Setup is now complete! Please remember to configure your .env file.
pause
```

### Linux Setup

To streamline the setup process on Linux, follow these instructions:

1. **Script Preparation**:
   - Save the following content as `setup.sh` in your project's root directory.
2. **Script Execution**:
   - Make the script executable with `chmod +x setup.sh` and execute it using `./setup.sh`.

#### `setup.sh` Content:

```bash
#!/bin/bash

echo "Setting up DebateSphere environment..."
git clone https://github.com/Berakhah/DebateSphere.git
cd DebateSphere

echo "Configuring environment variables..."
cp .env.example .env
# Reminder: Don't forget to manually update the .env file with your custom settings.

echo "Installing necessary dependencies..."
npm install bcrypt@5.1.1 bcryptjs@2.4.3 body-parser@1.20.2 cors@2.8.5 date-fns@3.3.1 dotenv@16.3.2 express-rate-limit@7.1.5 express-validator@7.0.1 express@4.18.2 jest@29.7.0 jsonwebtoken@9.0.2 moment@2.30.1 mongoose@8.1.0 morgan@1.10.0 mssql@10.0.2 nodemailer@6.9.8 passport-jwt@4.0.1 passport-local@1.0.0 passport@0.7.0 qrcode@1.5.3 sequelize-cli@6.6.2 sequelize@6.35.2 socket.io@4.7.4 speakeasy@2.0.0 supertest@6.3.4 tedious@16.6.1

echo "DebateSphere is ready! Please ensure your .env is correctly configured."
```

## Post-Setup Configuration

After running the appropriate setup script for your operating system, please ensure to:
- Update the `.env` file with your database settings and other configurations as necessary.
- Verify that all dependencies were installed successfully and the environment is correctly configured for development.

## Support

For assistance or further information, please consult the [DebateSphere Documentation](https://github.com/Berakhah/DebateSphere/wiki) or reach out to our support team.

Thank you for setting up DebateSphere. We're excited to have you contribute to this project!
