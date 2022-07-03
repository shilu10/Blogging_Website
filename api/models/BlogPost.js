const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    photos: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
        },
    categories: {
        type: Array,
        required: false
    }
    },
    // this will create a timestamp for every addition of rows
    { timestamps: true }

);

module.exports = mongoose.model(
    "BlogPost",
    BlogPostSchema
    
)