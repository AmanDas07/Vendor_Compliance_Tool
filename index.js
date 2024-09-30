import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import colors from 'colors';
import authController from './controllers/authController.js';
import trackerController from './controllers/trackerController.js';
//import csrf from './controllers/csrfToken.js';
import csrf from 'csurf';
dotenv.config();

const app = express();

// Middleware setup for CORS
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true // Allow cookies to be sent
}));

// Other Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Database connection
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database".bgRed);
    } catch (err) {
        console.error("Database connection failed:", err);
    }
};

connection();

// Session management with MongoDB
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 1 * 60 * 60, // Session expiry time
    autoRemove: 'native'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookie only in production
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000 // 1 hour
    }
}));

// CSRF Protection
//Uncomment if CSRF is needed, ensure frontend handles the token correctly
const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true } });
app.use(csrfProtection);
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
        httpOnly: false,
        secure: true, // Set secure cookie only in production 'process.env.NODE_ENV === 'production'
        sameSite: 'None'
    });
    next();
});


// Routes
app.use('/api/v1/auth', authController);
app.use('/api/v1/tracker', trackerController);
//app.use('/api/v1', csrf);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`.bgCyan.white);
});
