const { enviarCorreoContacto } = require('../utils/emailService');

const contactarPublicador = async (req, res) => {
    const { correoPublicador, nombreSolicitante, correoSolicitante, tipo, titulo } = req.body;

    try {
        await enviarCorreoContacto(correoPublicador, nombreSolicitante, correoSolicitante, tipo, titulo);
        res.json({ success: true, mensaje: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({ error: 'No se pudo enviar el correo' });
    }
};

module.exports = { contactarPublicador };
