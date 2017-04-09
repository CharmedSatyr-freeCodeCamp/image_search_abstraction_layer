const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const inputSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

//first is db name, second is Schema defined above
module.exports = mongoose.model('Queries', inputSchema);
