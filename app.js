// app.js
// Aplicación principal MiniERP para una botiga
// Aquí configuramos Express, Handlebars, estáticos, y montamos las rutas.

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

// Importamos config de BD para tenerla accesible en app.locals
const dbConfig = require('./config/database');
app.locals.dbConfig = dbConfig; // Hacemos la config de BD accesible en las vistas

// Middleware para parsear datos de formularios (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, JS, imágenes) desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars como motor de vistas
// Configuración de Handlebars como motor de vistas
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),   // ✔ correcto
    partialsDir: path.join(__dirname, 'views', 'partials'), // ✔ correcto
    helpers: {
      eq: (a, b) => a === b,
      gt: (a, b) => a > b,
      lt: (a, b) => a < b,
    },
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para inyectar un tema por defecto (el tema real se gestiona en el cliente con localStorage)
app.use((req, res, next) => {
    res.locals.theme = 'clar';
    next();
});

// Importamos rutas
const dashboardRoutes = require('./routes/dashboard');
const productesRoutes = require('./routes/productes');
const clientsRoutes = require('./routes/clients');
const vendesRoutes = require('./routes/vendes');

// Montamos rutas
app.use('/', dashboardRoutes);
app.use('/productes', productesRoutes);
app.use('/clients', clientsRoutes);
app.use('/vendes', vendesRoutes);

// Arrancamos servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor MiniERP escuchando en http://localhost:${PORT}`);
});