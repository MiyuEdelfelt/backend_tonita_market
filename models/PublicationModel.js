const pool = require('../config/db');

const PublicationModel = {
    create: async ({ title, description, image, price, categoryId, userId }) => {
        const result = await pool.query(
            `INSERT INTO publications (title_publication, description_publication, image_publication, price_publication, category_id, user_id)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, description, image, price, categoryId, userId]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query(`SELECT * FROM publications WHERE m_anulado = false`);
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(`SELECT * FROM publications WHERE id_publication = $1 AND m_anulado = false`, [id]);
        return result.rows[0];
    },

    update: async (id, data) => {
        const result = await pool.query(
            `UPDATE publications
             SET title_publication = $1, description_publication = $2, image_publication = $3, price_publication = $4, category_id = $5
             WHERE id_publication = $6
             RETURNING *`,
            [data.title, data.description, data.image, data.price, data.categoryId, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query(
            `UPDATE publications SET m_anulado = true WHERE id_publication = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
};

module.exports = PublicationModel;
