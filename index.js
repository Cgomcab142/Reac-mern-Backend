require("dotenv").config();

const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors')

// crear el server de express

const app = express();

// BBDD
dbConnection();

// cors
app.use(cors());

// directorio público

app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

// RUTAS
// auth
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//crud

// escuchar las peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
