require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes-productos.js");
const logger = require('./middlewares/logger.js');
const Product = require("./models/Product");
const productosData = require("./productos-data");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// IMPORTANTE: Las rutas API deben ir ANTES de los archivos estaticos
// Rutas de productos - la base "/api/productos" se define aquí
app.use("/api/productos", routes);

// Ruta raíz (informativa)
app.get('/', (req, res) => {
    res.json({ 
        message: "API de Hermanos Jota",
        version: "1.0.0",
        endpoints: {
            productos: "/api/productos",
            productoById: "/api/productos/:id"
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
    const total = await Product.estimatedDocumentCount();
    if (total > 0) return;

    const productosFormateados = productosData.map(({ id, imagen, ...resto }) => ({
        ...resto,
        imagenUrl: imagen || "",
    }));

    await Product.insertMany(productosFormateados);
    console.log("Productos iniciales cargados en la base de datos");
};

const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("La variable de entorno MONGODB_URI no está definida");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión a MongoDB establecida");

        await seedInitialProducts();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();