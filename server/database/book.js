const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    name : String,
    id :    String,
    authorid : String,
    genre : String
});

module.exports = mongoose.model('Book',bookSchema);