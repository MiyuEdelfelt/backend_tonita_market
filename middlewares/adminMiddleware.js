const adminMiddleware = (req, res, next) => {
    if (req.user?.role_cat_id !== 1) {
        return res.status(403).json({ message: 'Acceso restringido a administradores' });
    }
    next();
};

module.exports = adminMiddleware;
