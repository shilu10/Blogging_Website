const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
    },
    // this will create a timestamp for every addition of rows
    { timestamps: true }

);

module.exports = mongoose.model(
    "Category",
    CategorySchema
    
)