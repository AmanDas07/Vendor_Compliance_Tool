const express = require('express');
const multer = require('multer');
const mailgun = require('mailgun-js');
const path = require('path');

const app = express();
const DOMAIN = 'your-domain.com'; // Replace with your Mailgun domain
const API_KEY = 'your-mailgun-api-key'; // Replace with your Mailgun API key

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store files in memory (RAM)
const upload = multer({ storage });

// Email sending function
const sendEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    // Create an array of attachments for Mailgun
    const attachments = [];
    if (req.files) {
        req.files.forEach(file => {
            attachments.push(new mg.Attachment({
                data: file.buffer, // Use buffer to attach file directly from memory
                filename: file.originalname,
                contentType: file.mimetype,
            }));
        });
    }

    const emailData = {
        from: 'Your App <no-reply@your-domain.com>', // Replace with your "from" address
        to: to,
        subject: subject,
        text: message,
        attachment: attachments // Attachments array
    };

    try {
        await mg.messages().send(emailData);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

// Endpoint for sending emails with attachments
app.post('/api/v1/email', upload.any(), sendEmail);
