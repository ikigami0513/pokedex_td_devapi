const Type = require('../models/type');
const fs = require('fs');

exports.add = async (req, res) => {
    const name = req.body.name;
    const base64_image = req.body.image;

    const binary_image = Buffer.from(base64_image.split(',')[1], 'base64');
    const img_path = `uploads/${name}.png`;

    fs.writeFile(img_path, binary_image, 'binary', async (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: "Erreur lors de l'upload de l'image."
            });
        }
        else {
            const new_type = new Type({
                name: name,
                img_path: img_path
            });
        
            await new_type.save();
        
            res.status(201).json({
                type: new_type
            });
        }
    });
}

exports.get = async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(404).json({
            message: "Aucun nom fourni."
        });
    }

    const type = await Type.findOne({ name: name });

    if (type) {
        res.status(200).json({
            type: type
        })
    }
    else {
        res.status(404).json({
            message: `Aucun type nommé ${name} trouvé.`
        });
    }
}

exports.all = async (req, res) => {
    const types = await Type.find();

    res.status(200).json(types);
}
