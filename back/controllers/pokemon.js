const Pokemon = require('../models/pokemon');
const fs = require('fs');

exports.get_page = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const page_size = 16;
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
                pokemon = await Pokemon.findOne({ name: name });
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
        const { 
            name, 
            national,
            image,
            height, 
            weight, 
            type1_id, 
            type2_id, 
            health_point, 
            attack, 
            defense, 
            attack_spe, 
            defense_spe, 
            speed
        } = req.body;

        const binary_image = Buffer.from(image.split(',')[1], 'base64');
        const img_path = `uploads/${name}.png`;

        fs.writeFile(img_path, binary_image, 'binary', async (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: "Erreur lors de l'upload de l'image."
                });
            }
            else {
                const new_pokemon = new Pokemon({
                    name,
                    national,
                    img_path,
                    height,
                    weight,
                    type1_id,
                    type2_id,
                    health_point,
                    attack,
                    defense,
                    attack_spe,
                    defense_spe,
                    speed
                });
        
                const saved_pokemon = await new_pokemon.save();
        
                res.status(201).json(saved_pokemon);
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de l'ajout du Pokémon"
        });
    }
}
