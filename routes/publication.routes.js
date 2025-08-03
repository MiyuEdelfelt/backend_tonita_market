const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/PublicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', PublicationController.getAll);
router.post('/', authMiddleware, upload.single('image'), PublicationController.create); 
router.put('/:id', authMiddleware, PublicationController.update);
router.delete('/:id', authMiddleware, PublicationController.delete);
router.get('/one-per-category', PublicationController.getOnePerCategory);
router.get('/by-category/:id', PublicationController.getByCategory);

router.get('/mine', authMiddleware, PublicationController.getMine);
router.get('/admin', authMiddleware, adminMiddleware, PublicationController.getAllAdmin);


module.exports = router;



