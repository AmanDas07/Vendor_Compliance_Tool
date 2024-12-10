import { Router } from "express";
import companySchema from "../models/companySchema.js"
import { requireSignIn, sessionCheck } from "../middlewares/authMiddleware.js";

const companydetailController = Router();

companydetailController.get("/companyinfo", requireSignIn, sessionCheck, async (req, res) => {
    try {
        const managers = await userModel.findMany({ role: 'manager' });
        console.log(managers);
        return res.status(200).send(company);
    } catch (error) {
        console.log("Error");
        return res.status(500).send({ message: "Error fetching user info" });
    }
});

export default companydetailController;