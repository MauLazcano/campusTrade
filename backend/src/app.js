const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json()); // Parseo de JSON

app.use(cors());
app.use(bodyParser.json());

// Rutas
//const authRoutes = require('./routes/authRoutes');
//const booksRoutes = require('./routes/booksRoutes');
//const clubRoutes = require('./routes/clubRoutes');
//const sessionRoutes = require('./routes/sessionRoutes');
//const searchRoutes = require('./routes/searchRoutes');

//app.use('/api/clubes', clubRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/books', booksRoutes);
//app.use('/api/sesiones', sessionRoutes);
//app.use('/api', searchRoutes);


// Servir archivos estáticos (HTML, CSS, JS) desde carpeta public
app.use(express.static('frontend'));


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
