const mongoose = require('mongoose');

const RecipieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    ingredients: [{
        item: {
            type: String,
            required: true
        },
        hasItem: {
            type: Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    _creator: {
        type: String,
        required: true,
        ref: 'User'
    }
});

const Recipie = mongoose.model('Recipie', RecipieSchema);

module.exports = { Recipie };