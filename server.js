const express = require('express');
const path = require('path');
const cors = require('cors');
const productos = require('./public/js/productos-data.js');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Servir archivos estaticos DESPUÉS de las rutas API
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para frontend (al final)
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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/productos`);
});