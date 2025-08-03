const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded);

        req.user = {
            id: decoded.id_user_cat,
            alias: decoded.alias_cat,
            role_cat_id: decoded.role_cat_id 
        };

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
