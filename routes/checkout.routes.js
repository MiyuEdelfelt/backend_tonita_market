const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/checkout', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        // Obtener ítems del carrito no anulados
        const cartItemsResult = await pool.query(
            'SELECT * FROM cart_items WHERE user_id = $1 AND m_anulado = false',
            [userId]
        );

        const cartItems = cartItemsResult.rows;

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        let total = 0;
        const saleItemsData = [];

        // Calcular total y preparar datos de venta
        for (const item of cartItems) {
            const pubResult = await pool.query(
                'SELECT price_publication FROM publications WHERE id_publication = $1',
                [item.publication_id]
            );

            const unitPrice = pubResult.rows[0].price_publication;
            total += unitPrice * item.quantity;

            saleItemsData.push({
                publication_id: item.publication_id,
                quantity: item.quantity,
                unit_price: unitPrice
            });
        }

        // Insertar en sales
        const saleResult = await pool.query(
            'INSERT INTO sales (user_id, total, sale_date) VALUES ($1, $2, NOW()) RETURNING id_sale',
            [userId, total]
        );

        const saleId = saleResult.rows[0].id_sale;

        // Insertar en sale_items y anular publicaciones
        for (const item of saleItemsData) {
            // Insertar ítem
            await pool.query(
                `INSERT INTO sale_items (sale_id, publication_id, quantity, unit_price)
                 VALUES ($1, $2, $3, $4)`,
                [saleId, item.publication_id, item.quantity, item.unit_price]
            );

            // Anular publicación (ya fue vendida)
            await pool.query(
                `UPDATE publications SET m_anulado = true WHERE id_publication = $1`,
                [item.publication_id]
            );
        }

        // Anular ítems del carrito
        await pool.query(
            'UPDATE cart_items SET m_anulado = true WHERE user_id = $1',
            [userId]
        );

        res.json({ message: 'Compra realizada con éxito', sale_id: saleId });

    } catch (error) {
        console.error('Error en el checkout:', error);
        res.status(500).json({ message: 'Error interno al realizar la compra' });
    }
});

module.exports = router;
