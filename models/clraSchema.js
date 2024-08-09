const mongoose = require('mongoose');

const CLRASchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    uin: {
        type: String,
        required: true
    },
    intelEntity: {
        type: String,
        required: true
    },
    contractorName: {
        type: String,
        required: true
    },
    contractorAddress: {
        type: String,
        required: true
    },
    natureOfWork: {
        type: String,
        required: true
    },
    maxMenEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    maxWomenEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    totalEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    latestMaxMenEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    latestMaxWomenEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    latestTotalEmployees: {
        srr: { type: Number, default: 0 },
        bga: { type: Number, default: 0 },
        eco2AB: { type: Number, default: 0 },
        eco4B: { type: Number, default: 0 },
        electronicCity: { type: Number, default: 0 },
        hyderabad: { type: Number, default: 0 }
    },
    mobileNumber: {
        type: String,
        required: true
    },
    contractStartDate: {
        type: Date,
        required: true
    },
    contractEndDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('CLRA', CLRASchema);

