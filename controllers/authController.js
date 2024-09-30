import { Router } from "express";
import userModel from "../models/userModel.js";
import { comparePassword, hashed } from "../helpers/helper.js"
import JWT from 'jsonwebtoken';
import { requireSignIn } from "../middlewares/authMiddleware.js";
const authController = Router();

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    /* console.log('Session ID:', req.sessionID); // Check if session is available
     console.log('CSRF Token:', req.csrfToken());*/
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
        user.password = undefined;
        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            company: user.Company
        };
        try {
            res.cookie('token', token, {
                httpOnly: true, maxAge: 1 * 60 * 60 * 1000, sameSite: 'None', secure: true
            });
        } catch (error) {
            console.error(error);
        }

        const data = res.getHeaders();
        //console.log(data['set-cookie']);
        res.status(200).send({
            role: req.session.user.role,
            success: true,
            message: "Login Successful",
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
            role: user.role,
            success: false,
            message: "New Password cannot be Empty"
        })
    }
    const checkUser = await userModel.findById(req.user._id);
    const match = comparePassword(oldPassword, checkUser.password);
    if (!match) { return res.status(400).send("Invalid Password") };
    const matchold2new = comparePassword(newPassword, checkUser.password);
    if (matchold2new) { return res.status(400).send("New Password cannot be the same as Old Password") }

    await userModel.findByIdAndUpdate(req.user._id, { password: hashed(newPassword) })
    return res.status(200).send("Password Reset Successfully");

})

authController.post("/logout", requireSignIn, async (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
})

authController.get('/session_data', requireSignIn, (req, res) => {
    //console.log(req.user.role);
    if (!req.session || !req.user) {
        return res.status(401).send("Unauthorized");
    }
    res.status(200).send({
        success: true,
        user: req.user.role
    });
});




authController.post("/register_user", async (request, response) => {
    const company = request.body.Company;
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const phone = request.body.phone;
    //const [error, setError] = useState("");
    if (!name) {
        // console.log("REQUEST.BODY" + request.body);
        return response.status(400).send('Name is required');
    }
    if (!password) {
        return response.status(400).send('Password is required');
    }
    if (!phone) {
        return response.status(400).send('Phone Number is required');
    }
    if (!company) {
        return response.status(400).send('Company is required');
    }
    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
        return response.status(400).send('Invalid Email');

    }

    if (password.length < 8) {
        return response.status(400).send("Password too short");
    }

    //Hashed password


    try {

        const save = async () => {
            const exist = await userModel.findOne({ email: email }).exec();
            if (exist) {
                // console.log(exist.email);
                return response.status(400).send('Email already exists');

            }
            else {
                //username: nanoid(7),
                //console.log(exist.email);
                const hashedPassword = await hashed(password);
                const user = new userModel({ Company: company, name, phone, email, password: hashedPassword });
                await user.save().then(() => { return response.status(200).send('User Registered') });
            }

        }
        save();

    } catch (error) {
        console.log(error);
    }


})

export default authController;

/*


*/