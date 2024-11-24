import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the Company schema
        ref: 'companies',  // Name of the Company model
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    messagesSent: [{
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        subject: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        sentAt: {
            type: Date,
            default: Date.now,
        }
    }],
    Assigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trackers',
    }],
    messagesRecieved: [{
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        subject: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        recievedAt: {
            type: Date,
            default: Date.now,
        }
    }],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    role: {
        type: String,
        default: 'spocs',
    }
}, { timestamps: true });

export default mongoose.model('Users', userSchema);
