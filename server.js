const express = require('express');
const path = require('path');
const cors = require('cors');
const productos = require('./productos-data.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para servir archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/producto/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'producto.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

app.get('/api/productos', (req, res) => {
    // Aquí puedes servir datos desde una base de datos
    res.json(productos);
});

app.get('/api/productos/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if(!producto){
        return res.status(404).json({ error: "Producto no encontrado"});
    }

    res.json(producto);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});