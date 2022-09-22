const mongoose = require('mongoose');


// file paths schema
const filePath = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    }
})

const FilePath = mongoose.model('FilePath', filePath);
module.exports = FilePath;