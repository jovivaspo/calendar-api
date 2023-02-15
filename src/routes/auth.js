const { Router } = require("express");
const auth = require("../controllers/auth");
const { check } = require("express-validator");
const validarCampos = require("../middleware/validar-campos");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El campo name es obligatorio").not().isEmpty(),

    check("email", "El campo email debe ser válido").isEmail(),

    check(
      "password",
      "El campo password debe de tener más de 6 caracteres"
    ).isLength({ min: 6 }),

    validarCampos,
  ],
  auth.crearUsuraio
);

router.post(
  "/",
  [
    check("email", "El campo email debe ser válido").isEmail(),

    check(
      "password",
      "El campo password debe de tener más de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  auth.loginUsuario
);

router.get("/renew", async (req, res) => {
  return res.send("Miu");
});

module.exports = router;
