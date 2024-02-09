const Pokemon = require('../models/pokemon');

exports.get_page = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const page_size = 25;
        const skip = (page - 1) * page_size;

        const pokemons = await Pokemon.find()
        .skip(skip)
        .limit(page_size);

        res.status(200).json(pokemons);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données.'});
    }
}

exports.get = async (req, res) => {
    try {
        let pokemon;

        const param = req.query.pokemon;

        if (param) {
            if (param.startsWith('name:')) {
                const name = param.substring(5);
                pokemon = await Pokemon.findOne({ name: name});
            }

            else if (param.startsWith('national:')) {
                const national = param.substring(9);
                pokemon = await Pokemon.findOne({ national: national });
            }
        }

        if (pokemon) {
            res.status(200).json(pokemon);
        }
        else {
            res.status(404).json({
                message: "Aucun pokémon trouvé."
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération du pokémon."
        });
    }
}

exports.add = async (req, res) => {
    try {
        const { name, national, height, weight, type1_id, type2_id, pre_evo_ids, evo_ids } = req.body;
        const img_path = req.file.path;

        const new_pokemon = new Pokemon({
            name,
            national,
            img_path,
            height,
            weight,
            type1_id,
            type2_id,
            pre_evo_ids,
            evo_ids
        });

        const saved_pokemon = await new_pokemon.save();

        res.status(201).json(saved_pokemon);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de l'ajout du Pokémon"
        });
    }
}
