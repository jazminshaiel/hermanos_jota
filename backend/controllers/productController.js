const Product = require("../models/Product");

const buildProductPayload = (body) => {
  const payload = {
    nombre: body.nombre,
    descripcion: body.descripcion,
    precio: body.precio,
    stock: body.stock,
    categoria: body.categoria,
    imagenUrl: body.imagenUrl || body.imagen,
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
};

// GET: Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// GET: Obtener un producto específico por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// POST: Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res
      .status(400)
      .json({ error: "El nombre y el precio son obligatorios" });
  }

  try {
    const productoCreado = await Product.create(buildProductPayload(req.body));
    res.status(201).json(productoCreado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// PUT: Actualizar un producto existente
const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      buildProductPayload(req.body),
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// DELETE: Eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};

