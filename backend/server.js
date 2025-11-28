require("dotenv").config();
const express = require('express');
const cors = require('cors');
const productosRoutes = require("./routes/productos.js");
const logger = require('./middlewares/logger.js');
const Product = require("./models/Product");
const productosData = require("./productos-data");
const conectarDB = require('./config/database');

// Importar rutas de autenticación (usando el nuevo sistema)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes.js');
const pedidosRoutes = require('./routes/pedidos');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// IMPORTANTE: Las rutas API deben ir ANTES de los archivos estaticos
// Rutas de productos - la base "/api/productos" se define aquí
app.use("/api/productos", productosRoutes);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de usuarios (perfil)
app.use('/api/users', userRoutes);

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
                login: "POST /api/auth/login",
                registro: "POST /api/auth/registro"
            },
            pedidos: {
                crear: "POST /api/pedidos (requiere autenticación)",
                misPedidos: "GET /api/pedidos/mis-pedidos (requiere autenticación)",
                pedidoById: "GET /api/pedidos/:id (requiere autenticación)"
            }
        }
    });
});

// Manejador para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});

const seedInitialProducts = async () => {
    try {
        const total = await Product.estimatedDocumentCount();
        if (total > 0) return;

        const productosFormateados = productosData.map(({ id, imagen, ...resto }) => ({
            ...resto,
            imagenUrl: imagen || "",
        }));

        await Product.insertMany(productosFormateados);
        console.log("Productos iniciales cargados en la base de datos");
    } catch (error) {
        console.error("Error al cargar productos iniciales:", error);
    }
};

// Sembrar productos después de conectar a la base de datos
setTimeout(async () => {
    await seedInitialProducts();
}, 1000);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});