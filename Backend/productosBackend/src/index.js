const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ProductosRouter = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/Backendproductos', ProductosRouter);
app.use('/', (req, res) => res.json({ usersRootOnline: true }));
app.use('/_id:',ProductosRouter);


mongoose
  .connect("mongodb://127.0.0.1:27017/Backendproductos")
  .then(() => console.log('Users database connected'))
  .catch((err) => console.log(`Fail connection, error: ${err}`));
app.listen(4000, () => console.log('Users server running on port 4000'));