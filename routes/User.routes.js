const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Solo admins
router.get('/users', authMiddleware, adminMiddleware, UserController.getAllUsers);
router.delete('/:id', authMiddleware, adminMiddleware, UserController.deleteUser);

module.exports = router;
