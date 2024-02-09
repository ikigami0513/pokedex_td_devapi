const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    is_admin: Boolean
});

module.exports = mongoose.model('User', userSchema);
