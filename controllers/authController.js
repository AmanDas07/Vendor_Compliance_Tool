import { Router } from "express";
import userModel from "../models/userModel.js";
import { comparePassword } from "../helpers/helper.js"
import JWT from 'jsonwebtoken';
import { checkAuth, requireSignIn } from "../middlewares/authMiddleware.js";
const authController = Router();

authController.post('/login', requireSignIn, async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send("Please provide Email");
    }
    if (!password) {
        return res.status(400).send("Please provide Password");
    }
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid Email or Password");
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send("Invalid Email or Password");
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie('token', token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                company: user.Company
            },
            token,
        });
    } catch (error) {
        return res.status(400).send('Error Fetching Data');
    }
});
authController.post('/change-password', requireSignIn, async (req, res) => {
    const { oldPassword } = req.body;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).send({
            success: false,
            message: "New Password cannot be Empty"
        })
    }
    const checkUser = await userModel.findById(req.user._id);
    const match = comparePassword(oldPassword, checkUser.password);
    if (!match) { return res.status(400).send("Invalid Password") };
    const matchold2new = comparePassword(newPassword, checkUser.password);
    if (matchold2new) { return res.status(400).send("New Password cannot be the same as Old Password") }

    await userModel.findByIdAndUpdate(req.user._id, { password: newPassword })
    return res.status(200).send("Password Reset Successfully");

})

authController.post("/logout", checkAuth, async (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
})

export default authController;

/*


*/