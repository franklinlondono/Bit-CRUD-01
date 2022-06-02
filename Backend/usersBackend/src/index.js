const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/users', usersRouter);
app.use('/', (req, res) => res.json({ usersRootOnline: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log('Users database connected'))
  .catch((err) => console.log(`Fail connection, error: ${err}`));

app.listen(4100, () => console.log('Users server running on port 4100'));