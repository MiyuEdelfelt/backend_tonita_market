const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/PublicationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', PublicationController.getAll);
router.post('/', authMiddleware, PublicationController.create);
router.put('/:id', authMiddleware, PublicationController.update);
router.delete('/:id', authMiddleware, PublicationController.delete);

module.exports = router;
