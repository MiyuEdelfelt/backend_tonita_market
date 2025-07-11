const pool = require('../config/db');

const UserModel = {
    createUser: async ({ name, lastName, alias, email, password, roleId }) => {
        const result = await pool.query(
            `INSERT INTO user_cat (name_cat, last_name_cat, alias_cat, pass_cat, email_cat, role_cat_id, m_anulado)
             VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING *`,
            [name, lastName, alias, password, email, roleId]
        );
        return result.rows[0];
    },

    findByEmailOrAlias: async (value) => {
        const result = await pool.query(
            `SELECT * FROM user_cat WHERE (email_cat = $1 OR alias_cat = $1) AND m_anulado = false`,
            [value]
        );
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await pool.query(
            `SELECT * FROM user_cat WHERE id_user_cat = $1 AND m_anulado = false`,
            [id]
        );
        return result.rows[0];
    },

    getAllUsers: async () => {
        const result = await pool.query(
            `SELECT id_user_cat, name_cat, last_name_cat, alias_cat, email_cat, role_cat_id 
             FROM user_cat 
             WHERE m_anulado = false`
        );
        return result.rows;
    },

    deleteUser: async (id) => {
        // Verifica si es cliente antes de anularlo
        const check = await pool.query(
            `SELECT * FROM user_cat WHERE id_user_cat = $1 AND role_cat_id = 2 AND m_anulado = false`,
            [id]
        );
        if (check.rowCount === 0) return null;

        const result = await pool.query(
            `UPDATE user_cat SET m_anulado = true WHERE id_user_cat = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
};

module.exports = UserModel;
