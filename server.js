require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000; //Modificamos el puerto por uno que no este en uso.

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

