import mongoose from "mongoose";
import fileSchema from "./fileSchema.js";
import { v4 as uuidv4 } from 'uuid';

const trackerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    uniqueIdentifier: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    complianceActivity: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    actOrRule: {
        type: String,
        required: true,
    },
    sourceURL: {
        type: String,
        required: true,
    },
    periodicity: {
        type: String,
        required: true,
    },
    form: {
        type: String,
        default: '',
    },
    consequence: {
        type: String,
        required: true,
    },
    risk: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completionDate: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
    },
    proof: {
        type: Boolean,
        default: false,
    },
    assignedTo: {
        type: String,
    },
    comment: [
        {
            text: {
                type: String,
                required: true,
                trim: true,
            },
            created: {
                type: Date,
                default: Date.now,
            },
            postedBy: {
                type: mongoose.Schema.ObjectId,
                ref: "users",
            },
        },
    ],
    trackerOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
    },
    trackerManager: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
    },
    supportingDocuments: {
        type: [fileSchema],
    },
}, { timestamps: true });

export default mongoose.model('Tracker', trackerSchema);