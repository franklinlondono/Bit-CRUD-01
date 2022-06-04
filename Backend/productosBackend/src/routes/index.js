const express = require('express');
const Productos = require('../models/index');



const router = express.Router();

router.post('/', async (req,res) =>{
  try {
    const newProducto = Productos({ ...req.body });
   await newProducto.save()
   .then((data) => res.json({ success: data }))
   .catch((err) => res.json({ failure: true }));
} catch (error) {
 res.json({ failure: error });
}
})

router.get('/', async (req,res) =>{
  try {
    const productos = await Productos.find();
    res.json(productos)
  } catch (error) {
    res.json({ failure: error });
  }
})

router.put('/:id', async (req,res) =>{
try {
  const { nombre, categoria, precio, stock} = req.body;
  let producto = await Productos.findById(req.params.id);
  
  if (!producto){
      res.status(404).json({mgs: 'No Existe El Producto'})
  }
  
  producto.nombre = nombre;
  producto.categoria = categoria;
  producto.precio = precio;
  producto.stock = stock;

  producto = await Productos.findOneAndUpdate({_id:req.params.id},producto, {new: true})
  res.json(producto);

} catch (error) {
  res.json({ failure: error });
}


})

router.get('/:id', async (req,res) =>{
  try {
    let producto = await Productos.findById(req.params.id);
    
    if (!producto){
        res.status(404).json({mgs: 'No Existe El Producto'})
    }
    
    res.json(producto);
  
  } catch (error) {
    res.json({ failure: error });
  }
  

})

router.delete('/:id', async (req,res) =>{
  try {
    let producto = await Productos.findById(req.params.id);
    
    if (!producto){
        res.status(404).json({mgs: 'No Existe El Producto'})
    }

    await Productos.findByIdAndRemove({ _id: req.params.id })
    
    res.json({msg: 'Producto Eliminado Exitosamente'});
  
  } catch (error) {
    res.json({ failure: error });
  }
  

})

module.exports = router;