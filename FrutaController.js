const { json } = require("body-parser");
const express = require("express");
const Fruta = require("./Models/Fruta");
const router = express.Router();

// get devolver
// Para usarlo llamar a /api?tamano={tamano}&peso={peso}
router.get("/", async (req, res) => {
  const searchParameters = {};
  try {
    const { tamano, peso } = req.query;
    if (tamano) {
      searchParameters.tamano = tamano;
    }
    if (peso) {
      searchParameters.peso = peso;
    }
    const frutas = await Fruta.find(searchParameters);
    return res.json(frutas);
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Imposible procesar su solicitud.",
    });
  }
});

router.get("/fruta/:fruta", async (req, res) => {
  const fruta = req.params.fruta;
  const frutas = await Fruta.find({
    nombre: new RegExp(fruta, "i"),
  }).exec();
  return res.status(200).json(frutas);
});

// router.get("/estacion/:estacion", async (req, res) => {
//   const estacion = req.params.estacion;
//   const frutas = await Fruta.find({ estacion }).exec();
//   // const frutas = await Fruta.find({
//   //   estacion: new RegExp(estacion, "i"),
//   // }).exec();
//   return res.status(200).json(frutas);
// });

// post insertar
router.post("/", async (req, res) => {
  const nombreFruta = req.body.nombre;
  const colorFruta = req.body.color;
  const estacionFruta = req.body.estacion;
  const tamanoFruta = req.body.tamano;
  const pesoFruta = req.body.peso;

  const fruta = new Fruta({
    nombre: nombreFruta,
    color: colorFruta,
    estacion: estacionFruta,
    tamano: tamanoFruta,
    peso: pesoFruta,
  });

  try {
    const result = await fruta.save();
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      errorMessage: "Imposible guardar",
    });
  }
});

// put modificar
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const nombreFruta = req.body.nombre;
  const colorFruta = req.body.color;
  const estacion = req.body.estacion;
  const tamano = req.body.tamano;
  const peso = req.body.peso;

  const fruta = await Fruta.findById(id);
  fruta.nombre = nombreFruta ? nombreFruta : fruta.nombre;
  fruta.color = colorFruta ? colorFruta : fruta.color;
  fruta.estacion = estacion ? estacion : fruta.estacion;
  fruta.tamano = tamano ? tamano : fruta.tamano;
  fruta.peso = peso ? peso : fruta.peso;

  const nuevaFruta = await fruta.save();

  return res.json(nuevaFruta);
});

// delete eliminar
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Fruta.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (error) {
    res.status(500).json({ errorMessage: "Imposible procesar su solicitud." });
  }
});

module.exports = router;
