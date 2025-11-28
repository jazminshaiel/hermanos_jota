const express = require("express");
const router = express.Router();
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productController");

// GET: Obtener todos los productos
// URL completa: /api/productos
router.get("/", obtenerProductos);

// GET: Obtener un producto específico por ID
// URL completa: /api/productos/:id
router.get("/:id", obtenerProductoPorId);

// POST: Crear un nuevo producto
// URL completa: /api/productos
router.post("/", crearProducto);

// PUT: Actualizar un producto existente
// URL completa: /api/productos/:id
router.put("/:id", actualizarProducto);

// DELETE: Eliminar un producto
// URL completa: /api/productos/:id
router.delete("/:id", eliminarProducto);

module.exports = router;

