const mongoose = require('mongoose')

const apiSchema = new mongoose.Schema({
    title: String,
    description: String,
    auth: String,
    https: Boolean,
    cors: String,
    url: String,
    category: String
});

apiSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Api', apiSchema);