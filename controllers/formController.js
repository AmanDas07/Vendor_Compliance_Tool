import { Router } from "express";
import { checkAuth, requireSignIn } from "../middlewares/authMiddleware.js";

const formController = Router();

formController.post("/INTEL_CLRA", checkAuth, requireSignIn, async (req, res) => {

    const clraData = req.body;

    try {
        const updatedCLRA = await CLRA.findOneAndUpdate(
            {},
            clraData,
            { new: true, upsert: false }
        );

        if (!updatedCLRA) {
            return res.status(404).json({ message: 'CLRA document not found.' });
        }

        res.json(updatedCLRA);
    } catch (error) {
        res.status(500).json({ message: 'Error updating CLRA document.', error });
    }

});

export default formController;