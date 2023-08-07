const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Category', categorySchema);