// entrada de la aplicación.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const frutaController = require("./FrutaController");

mongoose.connect("mongodb://localhost:27017/frutas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", frutaController);

console.info("Escuchando en el puerto 3000");
app.listen(3000);
