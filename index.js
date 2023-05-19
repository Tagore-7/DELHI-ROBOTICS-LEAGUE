const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Firebase Cloud Function to send registration confirmation email
exports.sendConfirmationEmail = functions.database.ref('students/{studentId}').onCreate((snapshot, context) => {
    const studentData = snapshot.val();

    // Email details
    const mailOptions = {
        from: 'tagorerao01@gmail.com', // Replace with your email address
        to: studentData.email,
        subject: 'Registration Confirmation',
        text: `Dear ${studentData.name},\n\nThank you for registering for the robotic competition. Your registration has been successful!\n\nTeam: ${studentData.team}\n\nWe look forward to seeing you at the event.\n\nBest regards,\nThe Organizers`
    };

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tagorerao01@gmail.com', // Replace with your email address
            pass: 'Appalanaidu@77' // Replace with your email password or app password
        }
    });

    // Send the email
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});

