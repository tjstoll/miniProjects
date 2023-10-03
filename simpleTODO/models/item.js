// This is where we define the structure list items collection

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    listID: {
        type: mongoose.ObjectId,
        required: true
    },
    complete: {
        type: Boolean
    }
})

const item = mongoose.model('Item', itemSchema);

module.exports = item;