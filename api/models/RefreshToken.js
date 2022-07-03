const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    refreshtoken: {
        type: String,
        required: true,
        unique: true
        },
    username: {
        type: String,
        required: true, 
        unique: true
    }
})

module.exports = mongoose.model(
    "RefreshToken",
    RefreshTokenSchema
)