const express = require('express');
const cors = require('cors');
const productos = require('./productos-data.js');
const routes = require("./routes-productos.js");
const logger = require('./middlewares/logger.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// IMPORTANTE: Las rutas API deben ir ANTES de los archivos estaticos
// Devuelve todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});
app.use("/api", routes);

// Devuelve un producto específico
app.get('/api/productos/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if(!producto){
        return res.status(404).json({ error: "Producto no encontrado"});
    }

    res.json(producto);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});
//ya esta?
// Manejador para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});