const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    national: Number,
    name: String,
    img_path: String,
    height: Number,
    weight: Number,
    type1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    type2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: false
    },
    health_point: Number,
    attack: Number,
    defense: Number,
    attack_spe: Number,
    defense_spe: Number,
    speed: Number,
    pre_evo_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
    evo_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
