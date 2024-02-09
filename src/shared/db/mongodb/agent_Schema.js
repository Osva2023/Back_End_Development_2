const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            message: '{VALUE} is not a valid region'
        },
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 100,
    },
    fee: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        min: 0,
        default: 0
    },
    position: {
        type: String,
        enum: {
            values: ['agent', 'manager'],
            message: '{VALUE} is not a valid position'
        },
        default: 'agent'
    },
    regionRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',   
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);

// Path: src/shared/schemas/agent_Schema.js