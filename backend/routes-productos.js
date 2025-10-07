const express = require("express");
const router = express.Router();
const productos = require("./productos-data");

// Todos los productos
router.get("/productos", (req, res) => {
  res.json(productos);
});

// Obtener producto por ID
router.get("/productos/:id", (req, res) => {
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
    id: productos.lenght > 0 ? procutos[productos.lenght-1].id + 1:1,
    nombre,
    descripcion: descripcion || "",
    precio,
    imagen: imagen || "",
    categoria: categoria || "sin categoria",  
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProcuto);
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