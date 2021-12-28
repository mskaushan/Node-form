const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Data = mongoose.model('Data', formSchema);

module.exports = Data;