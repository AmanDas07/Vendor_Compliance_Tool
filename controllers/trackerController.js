import { Router } from 'express';
import multer from 'multer';
import { join } from 'path';
import { uploadFile } from './s3service.js';
import Tracker from '../models/trackerSchema.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { v4 as uuidv4 } from 'uuid';

const trackerController = Router();
const upload = multer({ dest: 'uploads/' });
//requireSignIn,
trackerController.post('/create-tracker', upload.array('files', 10), async (req, res) => {
    const {
        companyName,
        location,
        complianceActivity,
        description,
        category,
        actOrRule,
        lawArea,
        sectionDesc,
        sourceURL,
        periodicity,
        periodicityDueDate,
        form,
        consequence,
        risk,
        dueDate,
        completionDate,
        status,
        proof,
        Assignedto,
        trackerOwner,
        trackerManager
    } = req.body;

    try {
        let fileData = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const filePath = join(__dirname, file.path);
                const result = await uploadFile(filePath, process.env.S3_BUCKET_NAME);
                fileData.push({
                    fileId: uuidv4(),
                    fileName: file.originalname,
                    filePath: result.Location,
                    fileType: file.mimetype,
                    fileSize: file.size,
                });
            }
        }

        const trackerData = {
            uniqueIdentifier: uuidv4(),
            companyName,
            location,
            complianceActivity,
            description,
            category,
            actOrRule,
            lawArea,
            sectionDesc,
            sourceURL,
            periodicity,
            periodicityDueDate: [periodicityDueDate],
            form,
            consequence,
            risk,
            dueDate: new Date(dueDate),
            completionDate: completionDate ? new Date(completionDate) : null,
            status,
            proof: proof === 'true',
            Assignedto,
            trackerOwner,
            trackerManager,
        };

        if (fileData.length > 0) {
            trackerData.supportingDocuments = fileData;
        }

        const newTracker = new Tracker(trackerData);

        await newTracker.save();
        res.status(201).json({ success: true, message: 'Tracker created successfully', tracker: newTracker });
    } catch (error) {
        console.error('Error creating tracker:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});
trackerController.post("/get-trackers", async (req, res) => {
    const companyName = req.body.company;
    const location = req.body.state;
    const lawArea = req.body.lawArea;
    const periodicity = req.body.periodicity;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const actOrRule = req.body.actRule;
    const status = req.body.status;
    const query = {};

    if (companyName) {
        query.companyName = companyName;
    }
    if (location) {
        query.location = location;
    }
    if (lawArea) {
        query.lawArea = lawArea;
    }
    if (periodicity) {
        query.periodicity = periodicity;
    }
    if (startDate) {
        query.dueDate = { $gte: new Date(startDate) };
    }
    if (endDate) {
        query.dueDate = { ...query.dueDate, $lte: new Date(endDate) };
    }
    if (actOrRule) {
        query.actOrRule = actOrRule;
    }
    if (status) {
        query.status = status;
    }
    console.log('Constructed query:', query);
    try {
        const results = await Tracker.find(query).exec();
        console.log(results);
        return res.status(200).send(results);
    } catch (error) {
        console.error('Error fetching trackers:', error);
        throw new Error('Error fetching trackers');
    }
})

trackerController.get("/get-tracker/:id", requireSignIn, async (req, res) => {

    try {
        const tracker_id = req.params;
        const tracker = await trackerSchema.findOne(tracker_id);
        return res.status(201).send({ result: tracker });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Error in fetching details"
        })
    }
})

trackerController.get("/get_tracker/:uin", async (req, res) => {
    const uin = req.params.uin;
    try {
        const getTracker = async () => {
            const tracker = await Tracker.find({ uniqueIdentifier: uin });
            res.status(200).send(tracker);
        }
        getTracker();
    } catch (error) {
        console.log(error);
    }

})

trackerController.post("/update_tracker/:uin", async (req, res) => {
    try {
        // Build the dynamic update object
        const updateData = req.body;
        const updateObject = {};
        for (const [key, value] of Object.entries(updateData)) {
            if (value !== undefined && value !== null) {
                updateObject[key] = value;
            }
        }

        // Perform the update using findOneAndUpdate
        const updatedTracker = await Tracker.findOneAndUpdate(
            { uniqueIdentifier: req.params.uin },
            { $set: updateObject },
            { new: true, useFindAndModify: false }
        );

        console.log('Updated Tracker:', updatedTracker);
        return updatedTracker;
    } catch (error) {
        console.error('Error updating Tracker:', error);
        throw error;
    }
})


export default trackerController;
