const Type = require('../models/type');

exports.add = async (req, res) => {
    const name = req.body.name;
    const img_path = req.file.path;

    const new_type = new Type({
        name: name,
        img_path: img_path
    });

    await new_type.save();

    res.status(201).json({
        type: new_type
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
