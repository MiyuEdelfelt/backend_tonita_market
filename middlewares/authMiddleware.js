const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ⚠️ Asignamos los nombres que usas en los controllers
        req.user = {
            id: decoded.id_user_cat,
            role: decoded.role_cat_id,
            alias: decoded.alias_cat
        };

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
