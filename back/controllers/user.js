const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../settings');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({
                message: "Utilisateur non trouvé"
            });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                res.status(401).json({
                    message: "Mot de passe incorrect."
                });
            }
            else if (result) {
                const token = jwt.sign({ username: username, is_admin: user.is_admin }, secretKey, { expiresIn: "1h"});
                res.json({ token: token });
            }
            else {
                res.status(401).json({
                    message: "Mot de passe incorrect."
                })
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
}

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try{
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Cet utilisateur existe déjà."
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashed_password, is_admin: false});
        await newUser.save();

        const token = jwt.sign({ username: newUser.username, is_admin: newUser.is_admin }, secretKey, { expiresIn: "1h"});
        res.json({ token: token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de l'inscription."
        });
    }
}

exports.get = async (req, res) => {
    const user = {
        id: req.user.id,
        username: req.user.username,
        is_admin: req.user.is_admin
    };

    res.status(200).json(user);
}

exports.get_all = async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}
