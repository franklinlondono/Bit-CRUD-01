const Database = require ("./app/config/database");
const config = require("./app/config/config");
const App = require("./app/app");

Database.connect();

App.listen(config.port, function(error){
    if (error) return console.log(error);
    console.log(`servidor corriendo el puerto: ${config.port}`);
});