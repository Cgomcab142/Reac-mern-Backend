const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Events = require("../models/Events");

const getEventos = async (req, res = response) => {
  const eventos = await Events.find().populate("user", "name password");
  // con populate sacaremos los datos que nos interesen y van separados con espacios, sin comas

  res.json({
    ok: true,
    eventos,
  });
};

// {
//     ok:true,
//     msg: 'getEventos'
// },

const crearEvento = async (req, res = response) => {
  const evento = new Events(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      msg: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Admin",
    });
  }
};
// {
//     ok:true,
//     msg: 'crearEvento'
// },

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Events.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento con el ID especificado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene los permisos necesarios para actualizar el evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Events.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true },
    );
    res.json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};
// {  /id21323124
//     ok:true,
//     msg: 'actualizarEvento'
// },

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
try {
  
  const evento = await Events.findById(eventoId);

  if (!evento) {
    return res.status(404).json({
      ok: false,
      msg: "No existe un evento con el ID especificado",
    });
  }

  if (evento.user.toString() !== uid) {
    return res.status(401).json({
      ok: false,
      msg: "No tiene los permisos necesarios para actualizar el evento",
    });
  }

  await Events.findByIdAndDelete(eventoId);
  res.json({ ok: true });

} catch (error) {
  console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
}
}
// { /id21323124
//     ok:true,
//     msg: 'eliminarEvento'
// }
module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
