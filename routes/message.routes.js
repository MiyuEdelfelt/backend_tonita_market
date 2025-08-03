const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const MessageController = require('../controllers/MessageController');

// 🚀 Iniciar conversación automática si no existe
router.post('/initiate', authMiddleware, MessageController.iniciarChat);

// 📥 Obtener bandeja de entrada del usuario autenticado (últimos mensajes por contacto)
router.get('/inbox', authMiddleware, MessageController.obtenerBandejaEntrada);

// 📚 Obtener historial completo con otro usuario
router.get('/history/:receiverId', authMiddleware, MessageController.obtenerHistorialConUsuario);

// 📤 Enviar mensaje a otro usuario
router.post('/', authMiddleware, MessageController.enviarMensaje);

module.exports = router;
