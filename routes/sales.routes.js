const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/history', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            `
            SELECT 
                s.id_sale, 
                s.sale_date, 
                s.total,
                si.publication_id, 
                si.quantity, 
                si.unit_price,
                p.title_publication, 
                p.image_publication,
                p.category_id,
                p.description_publication
            FROM sales s
            JOIN sale_items si ON s.id_sale = si.sale_id
            JOIN publications p ON si.publication_id = p.id_publication
            WHERE s.user_id = $1
            ORDER BY s.sale_date DESC
            `,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener historial de compras:', error);
        res.status(500).json({ message: 'Error interno al obtener historial' });
    }
});


module.exports = router;
