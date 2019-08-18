const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String, 
        required: true
    },
    hints: {
        type: Array,
        required: true
    },
    number:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('question', questionSchema);