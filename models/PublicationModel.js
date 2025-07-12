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
        const keys = Object.keys(data);
        const values = Object.values(data);

        // Genera partes dinámicas: title_publication = $1, description_publication = $2, ...
        const setClause = keys.map((key, index) => {
            let column;
            switch (key) {
                case 'title':
                    column = 'title_publication'; break;
                case 'description':
                    column = 'description_publication'; break;
                case 'image':
                    column = 'image_publication'; break;
                case 'price':
                    column = 'price_publication'; break;
                case 'categoryId':
                    column = 'category_id'; break;
                default:
                    throw new Error(`Campo no válido: ${key}`);
            }
            return `${column} = $${index + 1}`;
        }).join(', ');

        const query = `UPDATE publications SET ${setClause} WHERE id_publication = $${keys.length + 1} RETURNING *`;
        values.push(id); // agrega el id como último parámetro

        const result = await pool.query(query, values);
        return result.rows[0];
    },
    delete: async (id) => {
        const result = await pool.query(
            `UPDATE publications SET m_anulado = true WHERE id_publication = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    },

    //Sin loguin
    getOnePerCategory: async () => {
        const result = await pool.query(`
        SELECT DISTINCT ON (category_id) *
        FROM publications
        WHERE m_anulado = false
        ORDER BY category_id, id_publication DESC
    `);
        return result.rows;
    },

    getByCategory: async (categoryId) => {
        const result = await pool.query(`
        SELECT *
        FROM publications
        WHERE category_id = $1 AND m_anulado = false
        ORDER BY id_publication DESC
    `, [categoryId]);

        return result.rows;
    }
};

module.exports = PublicationModel;
