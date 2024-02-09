const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: String,
    img_path: String
});

module.exports = mongoose.model('Type', typeSchema);
