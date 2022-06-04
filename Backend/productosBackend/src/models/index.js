const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  fechaDeCreacion:{
    type: Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Productos', ProductosSchema);