const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    is_admin: Boolean,

    pokemons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
});

module.exports = mongoose.model('User', userSchema);
