import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
        trim: true
    },
    vendorId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
