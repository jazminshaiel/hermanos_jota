const express = require("express");
const router = express.Router();
const productos = require("./productos-data");


router.get("/productos", (req, res) => {
  res.json(productos);
});


router.get("/productos/:id", (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(producto);
});

module.exports = router;
//ya esta...?