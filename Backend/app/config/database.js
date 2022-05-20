const mongoose = require("mongoose");
const config = require("./config");

module.exports ={
    connection: null,
    connect: ()=> {
     if (this.connection) return this.connection;
     return mongoose.connect(config.DB_URI).then(connection => {
     this.connection = connection;
     console.log("Conexion A Base De Datos Exitosa");
     }).catch(Error => console.log("error"));

    }
}