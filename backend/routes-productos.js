const express = require("express");
const router = express.Router();
const productos = require("./productos-data");


// GET: Obtener todos los productos
// URL completa: /api/productos
router.get("/", (req, res) => {
  res.json(productos);
});

// GET: Obtener un producto específico por ID
// URL completa: /api/productos/:id
router.get("/:id", (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(producto);
});

module.exports = router;
//ya esta...?