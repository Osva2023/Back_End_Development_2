const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            message: '{VALUE} is not a valid region'
        },
        required: true
    },
    address: {
        type: String,
        required: true
        
    },
    total_sales: {
        type: Number,
        min: 0,
        default: 0
    },
    manager: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',      
    }],

    top_agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Region', regionSchema);
