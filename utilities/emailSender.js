const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another email service
        auth: {
            user: process.env.EMAIL_USERNAME, // Email account username from .env
            pass: process.env.EMAIL_PASSWORD, // Email account password from .env
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: email, // List of receivers
        subject: 'Verify Your Email for DebateSphere', // Subject line
        text: `Thank you for registering with DebateSphere. Please click on the following link to verify your email address: ${verificationLink}`, // plain text body
        html: `<p>Thank you for registering with DebateSphere. Please click on the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`, // HTML body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('ErroryourEmailPassword sending verification email:', error);
    }
};

module.exports = { sendVerificationEmail };
