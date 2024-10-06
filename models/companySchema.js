import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    locations: {
        type: [String],
        required: true,
    },
    lawArea: {
        type: [String],
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
