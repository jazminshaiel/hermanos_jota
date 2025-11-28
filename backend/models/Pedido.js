const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El pedido debe estar asociado a un usuario'],
  },
  productos: [
    {
      productoId: {
        type: Number,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser al menos 1'],
      },
      imagen: {
        type: String,
      },
    },
  ],
  total: {
    type: Number,
    required: [true, 'El total es requerido'],
    min: [0, 'El total no puede ser negativo'],
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_preparacion', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Actualizar fechaActualizacion antes de guardar
pedidoSchema.pre('save', function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

// Generar número de pedido virtual
pedidoSchema.virtual('numeroPedido').get(function () {
  return `PED-${this._id.toString().slice(-8).toUpperCase()}`;
});

pedidoSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Pedido', pedidoSchema);

