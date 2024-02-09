exports.is_admin = (req, res, next) => {
    if (req.user.is_admin) {
        next();
    }
    else {
        return res.status(401).json({
            message: "Vous n'êtes pas administrateur."
        });
    }
}
