const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const enviarCorreoContacto = async (correoDestinatario, nombreSolicitante, correoSolicitante, tipo, titulo) => {
    const mensaje = `
        Hola, alguien está interesado en tu publicación "${titulo}" (${tipo}).
        Nombre: ${nombreSolicitante}
        Correo de contacto: ${correoSolicitante}
        
        Puedes contactarlo directamente.
    `;

    await transporter.sendMail({
        from: `"Tonita Market" <${process.env.EMAIL_USER}>`,
        to: correoDestinatario,
        subject: `Nuevo contacto para tu ${tipo}`,
        text: mensaje,
    });
};

module.exports = { enviarCorreoContacto };
