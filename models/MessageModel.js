const db = require('../config/db');

const MessageModel = {
    async iniciarConversacion({ sender_id, receiver_id, message }) {
        const [result] = await db.execute(
            `INSERT INTO messages_users (sender_id, receiver_id, message, sent_at, m_anulado)
             VALUES (?, ?, ?, NOW(), 0)`,
            [sender_id, receiver_id, message]
        );
        return result.insertId;
    },

    async existeConversacion(sender_id, receiver_id) {
        const [rows] = await db.execute(
            `SELECT id_message FROM messages_users
             WHERE (
                 (sender_id = ? AND receiver_id = ?)
                 OR
                 (sender_id = ? AND receiver_id = ?)
             ) AND m_anulado = 0
             LIMIT 1`,
            [sender_id, receiver_id, receiver_id, sender_id] // se invierte para revisar ambos lados
        );
        return rows.length > 0;
    }
};

module.exports = MessageModel;
