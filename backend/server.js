require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productos = require('./productos-data.js');
const conectarDB = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth');
const pedidosRoutes = require('./routes/pedidos');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANTE: Las rutas API deben ir ANTES de los archivos estaticos
// Devuelve todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Devuelve un producto específico
app.get('/api/productos/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if(!producto){
        return res.status(404).json({ error: "Producto no encontrado"});
    }

    res.json(producto);
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de pedidos
app.use('/api/pedidos', pedidosRoutes);

// Ruta raíz (informativa)
app.get('/', (req, res) => {
    res.json({ 
        message: "API de Hermanos Jota",
        version: "1.0.0",
        endpoints: {
            productos: "/api/productos",
            productoById: "/api/productos/:id",
            auth: {
                register: "POST /api/auth/register",
                login: "POST /api/auth/login"
            },
            pedidos: {
                crear: "POST /api/pedidos (requiere autenticación)",
                misPedidos: "GET /api/pedidos/mis-pedidos (requiere autenticación)",
                pedidoById: "GET /api/pedidos/:id (requiere autenticación)"
            }
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});