const mongoose = require('mongoose');
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ]
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageUploadModel"
        }
    },
    // this will create a timestamp for every addition of rows
    { timestamps: true }

);

module.exports = mongoose.model(
    "User",
    UserSchema
)