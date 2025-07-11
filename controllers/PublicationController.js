const PublicationModel = require('../models/PublicationModel');

const PublicationController = {
    create: async (req, res) => {
        try {
            const { title, description, image, price, categoryId } = req.body;
            const userId = req.user.id;

            const publication = await PublicationModel.create({
                title,
                description,
                image,
                price,
                categoryId,
                userId
            });

            res.status(201).json({ message: 'Publicación creada', publication });
        } catch (err) {
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
            const roleId = req.user.role;

            const existing = await PublicationModel.getById(id);
            if (!existing) return res.status(404).json({ error: 'Publicación no encontrada' });

            // Solo admins o dueño
            if (existing.user_id !== userId && roleId !== 1)
                return res.status(403).json({ error: 'No autorizado para editar esta publicación' });

            const updated = await PublicationModel.update(id, {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                categoryId: req.body.categoryId
            });

            res.json({ message: 'Publicación actualizada', publication: updated });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar publicación', details: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userId = req.user.id;
            const roleId = req.user.role;

            const existing = await PublicationModel.getById(id);
            if (!existing) return res.status(404).json({ error: 'Publicación no encontrada' });

            if (existing.user_id !== userId && roleId !== 1)
                return res.status(403).json({ error: 'No autorizado para eliminar esta publicación' });

            const deleted = await PublicationModel.delete(id);
            res.json({ message: 'Publicación eliminada', publication: deleted });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar publicación', details: err.message });
        }
    }
};

module.exports = PublicationController;
