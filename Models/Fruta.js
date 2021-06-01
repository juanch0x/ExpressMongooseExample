const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const frutaSchema = new Schema({
  nombre: String,
  color: String,
  estacion: String,
  tamano: Number,
  peso: Number,
});

module.exports = mongoose.model("Fruta", frutaSchema);
