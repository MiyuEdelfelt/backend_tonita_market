const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ Obtener mensajes recibidos (inbox) — ¡Debe ir arriba!
router.get('/inbox', authMiddleware, async (req, res) => {
    const userId = req.user?.id;

    if (!userId || isNaN(userId)) {
        console.error("ID del usuario inválido:", userId);
        return res.status(400).json({ message: 'ID del usuario inválido' });
    }

    try {
        const result = await pool.query(
            `SELECT 
                mu.id_message,
                mu.message,
                mu.sent_at,
                u.alias_cat AS sender_alias,
                u.email_cat AS sender_email
            FROM messages_users mu
            JOIN user_cat u ON mu.sender_id = u.id_user_cat
            WHERE mu.receiver_id = $1
            ORDER BY mu.sent_at DESC`,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los mensajes recibidos:', error);
        res.status(500).json({ message: 'Error interno al obtener los mensajes' });
    }
});

// ✅ Enviar mensaje
router.post('/messages', authMiddleware, async (req, res) => {
    const senderId = req.user?.id;
    const { receiver_id, message } = req.body;

    if (!receiver_id || !message) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {
        await pool.query(
            `INSERT INTO messages_users (sender_id, receiver_id, message)
             VALUES ($1, $2, $3)`,
            [senderId, receiver_id, message]
        );

        res.json({ message: 'Mensaje enviado exitosamente' });
    } catch (err) {
        console.error('Error al enviar mensaje:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ✅ Obtener historial de mensajes entre dos usuarios
router.get('/messages/:receiverId', authMiddleware, async (req, res) => {
    const senderId = req.user?.id;
    const receiverId = parseInt(req.params.receiverId);

    if (!receiverId || isNaN(receiverId)) {
        return res.status(400).json({ message: 'ID del receptor inválido' });
    }

    try {
        const result = await pool.query(
            `SELECT 
                m.id_message,
                m.sender_id,
                m.receiver_id,
                m.message,
                m.sent_at,
                u1.alias_cat AS sender_alias,
                u2.alias_cat AS receiver_alias
             FROM messages_users m
             JOIN user_cat u1 ON m.sender_id = u1.id_user_cat
             JOIN user_cat u2 ON m.receiver_id = u2.id_user_cat
             WHERE (
                 (m.sender_id = $1 AND m.receiver_id = $2)
                 OR
                 (m.sender_id = $2 AND m.receiver_id = $1)
             )
             AND m.m_anulado = false
             ORDER BY m.sent_at ASC`,
            [senderId, receiverId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener mensajes:', err);
        res.status(500).json({ message: 'Error al obtener mensajes' });
    }
});

module.exports = router;
