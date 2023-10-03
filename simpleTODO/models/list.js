// This is where we define the structure of the list collection

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    item_ids: {
        type: Array
    }
});

const list = mongoose.model('list', listSchema);

module.exports = list;