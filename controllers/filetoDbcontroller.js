import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';
import express from 'express';
import Tracker from '../models/trackerSchema'
const xl = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });



xl.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = path.join(__dirname, req.file.path);
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);


        const trackers = data.map(row => ({
            companyName: row.companyName,
            uniqueIdentifier: row.uniqueIdentifier,
            location: row.location,
            complianceActivity: row.complianceActivity,
            description: row.description,
            category: row.category,
            actOrRule: row.actOrRule,
            lawArea: row.lawArea,
            sectionDesc: row.sectionDesc,
            sourceURL: row.sourceURL,
            periodicity: row.periodicity,
            periodicityDueDate: row.periodicityDueDate.split(','), // Assuming the dates are comma-separated in the Excel file
            form: row.form,
            consequence: row.consequence,
            risk: row.risk,
            dueDate: new Date(row.dueDate),
            completionDate: row.completionDate ? new Date(row.completionDate) : null,
            status: row.status,
            proof: row.proof === 'true',
            Assignedto: row.Assignedto,
        }));

        await Tracker.insertMany(trackers);

        res.status(200).json({
            success: true,
            message: 'Data successfully uploaded and saved.',
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('An error occurred while processing the file.');
    }
});