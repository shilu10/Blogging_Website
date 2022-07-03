const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: false,
    },
   
    username: {
        type: String,
        required: false, 
        unique: false,
    },
    parentId: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true,
    },
    blogName: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model(
    "Comment",
    CommentSchema
)