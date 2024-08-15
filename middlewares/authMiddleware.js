import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        console.log(token);
        if (!token) {
            console.log("No token provided");
            return res.status(401).send("Unauthorized");
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode._id);
        if (!req.user) {
            console.log("No user found for this token");
            return res.status(401).send("Unauthorized");
        }
        next();
    } catch (error) {
        console.log("Error verifying token:", error);
        res.status(401).send("Unauthorized");
    }
};


export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};

export const sessionCheck = async (req, res, next) => {

    if (!req.session || !req.user) {
        res.clearCookie('token');  // Clear the JWT token cookie
        return res.status(401).send('Session expired, please log in again');
    }
    next();
};

export const csrf = async (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).send('Form tampered with');
    } else {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    }
};