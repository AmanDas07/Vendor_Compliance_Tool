import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode._id);
        next();
    } catch (error) {
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



export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
};
