import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Company: {
        type: String,
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
            type: String,
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

    messagesRecieved: [{
        from: {
            type: String,
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
    role: {
        type: String,
        default: 'spocs',
    }
}, { timestamps: true });

export default mongoose.model('Users', userSchema);
