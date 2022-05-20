const express = require("express");
const productCtrl = require("../controllers/productController");

const Router = express.Router();


Router.get("/", productCtrl.index)//listar todos los productos
      .post("/", productCtrl.create) // Creata: http://localhost:3000/product/
      .get("/:key/:value", productCtrl.find, productCtrl.show) // Show buscar un producto
      .put("/:key/:value", productCtrl.find, productCtrl.update) // Update acctualiza un producto
      .delete("/:key/:value",productCtrl.find,productCtrl.remove);// Delete elimina un producto

module.exports = Router;
