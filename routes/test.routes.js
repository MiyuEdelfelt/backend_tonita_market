const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/ping', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ status: 'ok', time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

module.exports = router;
