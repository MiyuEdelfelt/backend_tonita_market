const express = require('express');
const cors = require('cors');
const app = express();
const testRoutes = require('./routes/test.routes');
const testAdminRoutes = require('./routes/testAdmin.routes');
const publicationRoutes = require('./routes/publication.routes');

//Middlewares 
app.use(cors());
app.use(express.json());

//Rutas base
app.get('/', (req, res) => {
    res.send('API de Tonita Market funcionando correctamente');
});

//Rutas 
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/test', testAdminRoutes);
app.use('/api/publications', publicationRoutes);


// Test
app.use('/api/test', testRoutes);

module.exports = app;

