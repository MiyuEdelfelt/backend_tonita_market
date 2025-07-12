const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cart', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { publication_id } = req.body;

    try {
        const existingItem = await pool.query(
            'SELECT * FROM cart_items WHERE user_id = $1 AND publication_id = $2',
            [userId, publication_id]
        );

        if (existingItem.rows.length > 0) {
            return res.status(400).json({ message: 'Esta publicación ya está en el carrito' });
        }

        await pool.query(
            'INSERT INTO cart_items (user_id, publication_id, quantity, m_anulado) VALUES ($1, $2, 1, false)',
            [userId, publication_id]
        );

        res.json({ message: 'Publicación agregada al carrito' });

    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ message: 'Error interno' });
    }
});

router.get('/cart', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            `SELECT ci.*, p.title_publication, p.price_publication, p.image_publication
             FROM cart_items ci
             JOIN publications p ON ci.publication_id = p.id_publication
             WHERE ci.user_id = $1 AND ci.m_anulado = false`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});

// Eliminar producto del carro
router.delete('/:publication_id', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const publicationId = req.params.publication_id;

    try {
        const result = await pool.query(
            `UPDATE cart_items 
             SET m_anulado = true 
             WHERE user_id = $1 AND publication_id = $2 AND m_anulado = false
             RETURNING *`,
            [userId, publicationId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o ya eliminado del carrito' });
        }

        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).json({ message: 'Error interno al eliminar del carrito' });
    }
});

module.exports = router;