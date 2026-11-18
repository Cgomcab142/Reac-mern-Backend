// Rutas de eventos
//host + /api/events
const { Router } = require("express");
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();
const {validarJWT} = require('../middlewares/validar-jwt');
const { check } = require("express-validator");


const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// con este router se usa el JWT en cada una de las rutas de abajo
router.use( validarJWT);
// todas tienen que pasar por la validación de JWT
// petición obtener eventos
router.get("/", getEventos);

// crear nuevo evento
router.post("/", [
          check('title','El título es obligatorio').not().isEmpty(),
          check('start','La fecha de inicio es obligatoria').custom(isDate),
          check('end','La fecha de fin es obligatoria').custom(isDate),
          validarCampos

] ,crearEvento);

// actualizar evento
router.put("/:id", actualizarEvento);

// eliminar evento
router.delete("/:id", eliminarEvento);

module.exports =  router;

