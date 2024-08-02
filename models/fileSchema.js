import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const fileSchema = new Schema({
    /*fileId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },*/
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default fileSchema;
