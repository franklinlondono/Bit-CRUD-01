const mongoose = require ("mongoose");
const productSchema = new mongoose.Schema({
   name: {
       type: String,
       unique: true,
       required:true,
   },
   price: {
       type: Number,
       required: true,
   } ,
   category: {
       type: String,
       required: true,
       enun: ["Laptop","desktop","monitor",]
   },
   stock: {
       type: Number,
       default: 10
   },
   date: {
       type: Date,
       default: Date.now(),
   },

   Image:{
       type: String,
   },
});

const product = mongoose.model("product",productSchema);

module.exports = product;