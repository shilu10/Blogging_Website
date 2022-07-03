const mongoose = require('mongoose');

const ImageUploadSchema = mongoose.Schema([{
    id: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        required: false
    }
}]);

module.exports =mongoose.model(
        "ImageUploadModel",
        ImageUploadSchema
    );
