import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import csurf from 'csurf';
import colors from 'colors';
import authController from './controllers/authController.js';
import trackerController from './controllers/trackerController.js';
import sessionManager from './utils/sessionManager.js';

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Database connection
const connection = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Database".bgRed);
    }).catch((err) => {
        console.log(err);
    });
};

connection();

// Session management
/*const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 2 * 60 * 60,
    autoRemove: 'native'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 2 * 60 * 60 * 1000 } // 2 hours
}));

// CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);*/

// Routes
app.use('/api/v1/auth', authController);
app.use('/api/v1/tracker', trackerController);

app.get('/', (req, res) => {
    res.send('API is running...');
});

/*app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403);
    res.send('Form tampered with');
});

app.use(sessionManager);*/

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`.bgCyan.white);
});
