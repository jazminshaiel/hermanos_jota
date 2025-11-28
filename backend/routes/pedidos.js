const express = require('express');
const Pedido = require('../models/Pedido');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Crear nuevo pedido (protegido)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { productos, total } = req.body;

    // Validar campos requeridos
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El pedido debe contener al menos un producto',
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El total del pedido debe ser mayor a 0',
      });
    }

    // Crear nuevo pedido
    const pedido = new Pedido({
      usuario: req.usuario._id,
      productos,
      total,
    });

    await pedido.save();

    // Poblar información del usuario
    await pedido.populate('usuario', 'nombre email');

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      pedido: {
        _id: pedido._id,
        numeroPedido: pedido.numeroPedido,
        productos: pedido.productos,
        total: pedido.total,
        estado: pedido.estado,
        fechaCreacion: pedido.fechaCreacion,
        usuario: {
          nombre: pedido.usuario.nombre,
          email: pedido.usuario.email,
        },
      },
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear pedido',
      error: error.message,
    });
  }
});

// Obtener pedidos del usuario autenticado (protegido)
router.get('/mis-pedidos', verificarToken, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario._id })
      .sort({ fechaCreacion: -1 })
      .select('-usuario');

    res.json({
      success: true,
      cantidad: pedidos.length,
      pedidos,
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pedidos',
      error: error.message,
    });
  }
});

// Obtener un pedido específico (protegido)
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const pedido = await Pedido.findOne({
      _id: req.params.id,
      usuario: req.usuario._id,
    });

    if (!pedido) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado',
      });
    }

    res.json({
      success: true,
      pedido,
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pedido',
      error: error.message,
    });
  }
});

module.exports = router;

