const { Router } = require("express");
const { check } = require("express-validator");
const events = require("../controllers/events");
const validarJWT = require("../middleware/validar-jwt");
const validarCampos = require("../middleware/validar-campos");
const isDate = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

router.get("/", events.getEventos);

router.post(
  "/",
  [
    check("title", "El título es requerido").not().isEmpty(),
    check("start", "La fecha de inicio es requerida").custom(isDate),
    check("end", "La fecha de finalización es requerida").custom(isDate),
    validarCampos,
  ],
  events.crearEventos
);

router.put("/:id", events.actualizarEventos);

router.delete("/:id", events.borrarEventos);

module.exports = router;
