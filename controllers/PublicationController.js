const PublicationModel = require('../models/PublicationModel');

const PublicationController = {
    create: async (req, res) => {
        try {
            const { title, description, price, categoryId } = req.body;
            const userId = req.user.id;

            let imagePath = null;
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
            }

            const publication = await PublicationModel.create({
                title,
                description,
                image: imagePath,
                price,
                categoryId,
                userId
            });

            res.status(201).json({ message: 'Publicación creada', publication });
        } catch (err) {
            console.error('Error al crear publicación:', err);
            res.status(500).json({ error: 'Error al crear publicación', details: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const publications = await PublicationModel.getAll();
            res.json({ publications });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener publicaciones', details: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userId = req.user.id;
            const roleId = req.user.role_cat_id; // ✅ Corregido

            const existing = await PublicationModel.getById(id);
            if (!existing)
                return res.status(404).json({ error: 'Publicación no encontrada' });

            if (existing.m_anulado)
                return res.status(403).json({ error: 'No se puede editar una publicación anulada' });

            if (existing.user_id !== userId && roleId !== 1)
                return res.status(403).json({ error: 'No autorizado para editar esta publicación' });

            const updatedFields = {};
            if (req.body.title) updatedFields.title = req.body.title;
            if (req.body.description) updatedFields.description = req.body.description;
            if (req.body.image) updatedFields.image = req.body.image;
            if (req.body.price) updatedFields.price = req.body.price;
            if (req.body.categoryId) updatedFields.categoryId = req.body.categoryId;

            if (Object.keys(updatedFields).length === 0)
                return res.status(400).json({ error: 'No se enviaron campos para actualizar' });

            const updated = await PublicationModel.update(id, updatedFields);
            res.json({ message: 'Publicación actualizada', publication: updated });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar publicación', details: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userId = req.user.id;
            const roleId = req.user.role_cat_id; // ✅ Corregido

            const existing = await PublicationModel.getById(id);
            if (!existing)
                return res.status(404).json({ error: 'Publicación no encontrada' });

            if (existing.user_id !== userId && roleId !== 1)
                return res.status(403).json({ error: 'No autorizado para eliminar esta publicación' });

            const deleted = await PublicationModel.delete(id);
            res.json({ message: 'Publicación eliminada', publication: deleted });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar publicación', details: err.message });
        }
    },

    getOnePerCategory: async (req, res) => {
        try {
            const publications = await PublicationModel.getOnePerCategory();
            res.json({ publications });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener publicaciones por categoría', details: err.message });
        }
    },

    getMine: async (req, res) => {
        try {
            console.log("👉 Usuario autenticado:", req.user);
            const userId = req.user.id;

            const publications = await PublicationModel.getByUserId(userId);
            console.log("👉 Publicaciones del usuario:", publications);

            res.json({ publications });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener tus publicaciones', details: err.message });
        }
    },



    getByCategory: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.id);
            if (isNaN(categoryId)) {
                return res.status(400).json({ error: 'ID de categoría inválido' });
            }

            const publications = await PublicationModel.getByCategory(categoryId);
            res.json({ publications });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener publicaciones por categoría', details: err.message });
        }
    },

    // Para usuarios administradores listar
    getAllAdmin: async (req, res) => {
        try {
            const publications = await PublicationModel.getAll();
            res.json({ publications });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener publicaciones', details: err.message });
        }
    },

};

module.exports = PublicationController;
