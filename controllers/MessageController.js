const pool = require('../config/db');

const MessageController = {
    // Obtener la bandeja de entrada del usuario autenticado
    async obtenerBandejaEntrada(req, res) {
        const userId = req.user?.id;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'ID del usuario inválido' });
        }

        try {
            const result = await pool.query(
                `
                SELECT DISTINCT ON (contacto_id)
                    m.id_message,
                    m.message,
                    m.sent_at,
                    u.id_user_cat AS contacto_id,
                    u.alias_cat AS contacto_alias,
                    u.email_cat AS contacto_email
                FROM messages_users m
                JOIN user_cat u ON 
                    (CASE 
                        WHEN m.sender_id = $1 THEN m.receiver_id = u.id_user_cat
                        ELSE m.sender_id = u.id_user_cat
                    END)
                WHERE m.sender_id = $1 OR m.receiver_id = $1
                ORDER BY contacto_id, m.sent_at DESC
                `,
                [userId]
            );

            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener la bandeja de entrada:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Obtener historial completo de conversación con otro usuario
    async obtenerHistorialConUsuario(req, res) {
        const userId = req.user?.id;
        const otroUsuarioId = parseInt(req.params.id);

        if (!userId || !otroUsuarioId || isNaN(otroUsuarioId)) {
            return res.status(400).json({ message: 'Parámetros inválidos' });
        }

        try {
            const result = await pool.query(
                `
                SELECT 
                    id_message,
                    sender_id,
                    receiver_id,
                    message,
                    sent_at
                FROM messages_users
                WHERE 
                    (sender_id = $1 AND receiver_id = $2)
                    OR 
                    (sender_id = $2 AND receiver_id = $1)
                ORDER BY sent_at ASC
                `,
                [userId, otroUsuarioId]
            );

            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener historial de mensajes:', error);
            res.status(500).json({ message: 'Error al cargar los mensajes' });
        }
    },

    // Iniciar conversación automática con mensaje inicial
    async iniciarChat(req, res) {
        const sender_id = req.user?.id;
        const { receiver_id, message } = req.body;

        if (!sender_id || !receiver_id || !message?.trim()) {
            return res.status(400).json({ message: 'Campos requeridos faltantes' });
        }

        try {
            // Insertar el primer mensaje en la tabla
            const result = await pool.query(
                `
                INSERT INTO messages_users (sender_id, receiver_id, message)
                VALUES ($1, $2, $3)
                RETURNING id_message, sent_at
                `,
                [sender_id, receiver_id, message.trim()]
            );

            res.status(201).json({
                message: 'Conversación iniciada correctamente',
                id: result.rows[0].id_message,
                sent_at: result.rows[0].sent_at
            });
        } catch (error) {
            console.error('Error al iniciar conversación:', error);
            res.status(500).json({ message: 'Error al iniciar conversación' });
        }
    },

    // Enviar nuevo mensaje
    async enviarMensaje(req, res) {
        const sender_id = req.user?.id;
        const { receiver_id, message } = req.body;

        if (!sender_id || !receiver_id || !message?.trim()) {
            return res.status(400).json({ message: 'Campos requeridos faltantes' });
        }

        try {
            const result = await pool.query(
                `
                INSERT INTO messages_users (sender_id, receiver_id, message)
                VALUES ($1, $2, $3)
                RETURNING id_message, sent_at
                `,
                [sender_id, receiver_id, message.trim()]
            );

            res.status(201).json({
                message: 'Mensaje enviado correctamente',
                id: result.rows[0].id_message,
                sent_at: result.rows[0].sent_at
            });
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            res.status(500).json({ message: 'Error al enviar mensaje' });
        }
    }
};

module.exports = MessageController;
