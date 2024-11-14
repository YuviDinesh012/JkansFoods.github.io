const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse incoming request data and handle CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submissions
app.post('/send-feedback', (req, res) => {
    const { name, phone, email, rating, message } = req.body;

    // Create a transporter object using your email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jkansfoodskalavasal@gmail.com',
            pass: 'grcb rkyx weds xxcm'
        }
    });

    const mailOptions = {
        from: email, // Sender's email
        to: 'jkansfoodskalavasal@gmail.com', // Receiver's email (can be the same or different)
        subject: `Feedback from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Rating:</strong> ${rating} Stars</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send feedback.' });
        }
        res.status(200).json({ message: 'Feedback sent successfully!' });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
