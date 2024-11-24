import { SendMailClient } from 'zeptomail';
import multer from 'multer';
import { Router } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const emailController = Router();
const ZEPTOMAIL_API_URL = "api.zeptomail.in/";
const ZEPTOMAIL_API_KEY = "Zoho-enczapikey PHtE6r0IEbu6iGAu+hII7f7tFs6nNNt4q+s0KlES4YoWDf5XTk1UqYsiwz7i+h0oVaUWQKafzN08trOcurmBdGi8ZmkYDWqyqK3sx/VYSPOZsbq6x00et1UTc0zYVIHsdtRo3CTSs9jcNA==";

const client = new SendMailClient({ url: ZEPTOMAIL_API_URL, token: ZEPTOMAIL_API_KEY });

emailController.post('/send', upload.any(), async (req, res) => {
    const { from, to, subject, message } = req.body;

    // Convert uploaded files into attachments format for ZeptoMail
    const attachments = req.files.map(file => ({
        content: file.buffer.toString('base64'),
        name: file.originalname,
        mime_type: file.mimetype
    }));

    try {
        await client.sendMail({
            from: {
                address: `${from}@complisense.in`,
                name: "noreply"
            },
            to: [
                {
                    email_address: {
                        address: to,
                        name: "Updates"
                    }
                }
            ],
            subject: subject,
            htmlbody: `<div><b>${message}</b></div>`,
            attachments: attachments
        });

        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

export default emailController;
