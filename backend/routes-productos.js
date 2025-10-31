const express = require("express");
const router = express.Router();
let productos = require("./productos-data");

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

// Crear un nuevo producto
router.post ("/productos", (req,res) => {
  const {nombre, descripcion, precio, imagen, categoria} = req.body;
  
  if(!nombre || !precio){
    return res.status(400).json({error:"El nombre y el precio son obligatorios"});
  }

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length-1].id + 1:1,
    nombre,
    descripcion: descripcion || "",
    precio,
    imagen: imagen || "",
    categoria: categoria || "sin categoria",  
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
})

// Actualizar un producto existente
router.put("/productos/:id", (req,res)=>{
  const id = parseInt (req.params.id);
  const productoIndex = productos.findIndex(p=>p.id===id);

  if(productoIndex === -1){
    return res.status(404).json({error: "Producto no encontrado"});
  }

  const productoActualizado = {...productos[productoIndex], ...req.body};
  productos[productoIndex] = productoActualizado;

  res.json(productoActualizado);
});

// Eliminar un producto
router.delete ("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if(!producto){
    return res.status(404).json({error: "Producto no encontrado"});
  }

  productos = productos.filter(p=> p.id !== id);
  res.json({message: "Producto eliminado correctamente"});
});

module.exports = router;