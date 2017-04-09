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
}/*, {
    capped: {
        size: 1024,
        max: 1000,
        autoIndexId: true
    }
}*/);

//first is db name, second is Schema defined above
module.exports = mongoose.model('queries', inputSchema);
