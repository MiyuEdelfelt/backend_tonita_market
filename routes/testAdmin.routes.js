const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

router.get('/admin-area', auth, adminOnly, (req, res) => {
    res.json({ message: 'Área de administración permitida', user: req.user });
});

module.exports = router;
