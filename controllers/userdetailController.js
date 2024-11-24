import { Router } from "express";
import { requireSignIn, sessionCheck } from "../middlewares/authMiddleware.js";
import Company from "../models/companySchema.js"
import userModel from "../models/userModel.js";

const userdetailController = Router();  // Initialize Router

userdetailController.get("/userinfo", requireSignIn, sessionCheck, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate("company");
        user.Company = '6701ac690ce6258792736ef1';
        const companyDetails = await Company.findById(user.Company);
        if (!companyDetails) {
            return res.status(400).send({ message: "Company not found" });
        }

        // Construct userInfo object without modifying the user object directly
        const userInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            companyDetails: {
                company_name: companyDetails.company_name,
                locations: companyDetails.locations,
                lawArea: companyDetails.lawArea,
            }
        };
        // Send the combined object as the response
        return res.status(200).send(userInfo);

    } catch (error) {
        console.error('Error fetching user info:', error);
        return res.status(500).send({ message: 'Error fetching user info' });
    }
})

userdetailController.post("/Users", requireSignIn, sessionCheck, async (req, res) => {
    const { company, location, lawarea } = req.body;
    try {
        // Find the company by name
        const companyDoc = await Company.findOne({ company_name: company });
        if (!companyDoc) {
            return res.status(400).send({ message: "Company not found" });
        }

        // Build the query dynamically based on the provided filters
        const query = { Company: companyDoc._id };
        if (location && location.length > 0) {
            query.location = { $in: location }; // Match any selected location
        }
        if (lawarea) {
            query.lawarea = lawarea; // Match selected law area
        }

        // Fetch users based on the filters
        const users = await userModel.find(query);
        res.status(200).send(users);
    } catch (error) {
        console.error("Error getting Users:", error);
        res.status(400).send("Error getting Users");
    }
});


// Fetch a single user by ID
userdetailController.get("/user/:id", requireSignIn, sessionCheck, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).populate('Company');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error fetching user details');
    }
});



userdetailController.put("/update-user/:userId", requireSignIn, sessionCheck, async (req, res) => {
    const { userId } = req.params;  // Ensure userId is being captured here
    console.log("UserId in backend:", userId); // Log the userId to debug
    const { name, email, phone, role, company, location, lawArea } = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,  // This should be a valid ObjectId
            { name, email, phone, role, company, location, lawArea },
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error updating user info:", error);
        return res.status(500).send({ message: "Error updating user info" });
    }
});


userdetailController.post("/getDetails", requireSignIn, sessionCheck, async (req, res) => {
    try {
        const company_name = req.body.company_name;
        const company = await Company.findOne({ company_name: company_name }).select('lawArea');

        if (company) {
            res.status(200).json({
                success: true,
                data: company.lawArea
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default userdetailController;
