const jwt = require('jsonwebtoken');
const { secretKey } = require('../settings');

exports.check_token = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            message: "Token non fourni."
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token invalide."
            });
        }

        req.user = decoded
        next();
    });
}
