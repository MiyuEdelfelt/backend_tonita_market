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
        const result = await pool.query(`
        SELECT 
            p.*, 
            u.alias_cat AS user_name,
            u.email_cat,
            u.phone_cat
        FROM publications p
        JOIN user_cat u ON p.user_id = u.id_user_cat
        WHERE p.m_anulado = false
        ORDER BY p.id_publication DESC
    `);
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
    getByUserId: async (userId) => {
        const result = await pool.query(`
        SELECT * FROM publications
        WHERE user_id = $1 AND m_anulado = false
        ORDER BY id_publication DESC
    `, [userId]);
        return result.rows;
    },


    //Sin loguin
    getOnePerCategory: async () => {
        const result = await pool.query(`
        SELECT DISTINCT ON (p.category_id) 
            p.*, 
            u.alias_cat AS user_name,
            u.email_cat,
            u.phone_cat
        FROM publications p
        JOIN user_cat u ON p.user_id = u.id_user_cat
        WHERE p.m_anulado = false
        ORDER BY p.category_id, p.id_publication DESC
    `);
        return result.rows;
    },


    getByCategory: async (categoryId) => {
        const result = await pool.query(`
        SELECT 
            p.*,
            u.alias_cat AS user_name,
            u.email_cat,
            u.phone_cat
        FROM publications p
        JOIN user_cat u ON p.user_id = u.id_user_cat
        WHERE p.category_id = $1 AND p.m_anulado = false
        ORDER BY p.id_publication DESC
    `, [categoryId]);

        return result.rows;
    }

};

module.exports = PublicationModel;
