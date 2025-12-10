// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para usar variables de entorno

const productRoutes = require('./routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3001; // Usaremos el puerto 3001 para este backend

// --- 1. MIDDLEWARE ---
// Habilitar CORS para permitir llamadas desde el frontend de Angular (localhost:4200)
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));
app.use(express.json()); // Middleware para parsear JSON en las peticiones

// --- 2. CONEXIÓN A MONGODB ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventario_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conexión exitosa a MongoDB.'))
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err);
    process.exit(1); // Detener la app si la conexión falla
  });

// --- 3. RUTAS ---
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Inventory API (Node/Express) está corriendo.');
});


// --- 4. INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
  console.log(`Endpoints: http://localhost:${PORT}/api/products`);
});