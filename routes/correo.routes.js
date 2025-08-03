const express = require('express');
const router = express.Router();
const CorreoController = require('../controllers/CorreoController');

router.post('/contactar', CorreoController.contactarPublicador);

module.exports = router;
