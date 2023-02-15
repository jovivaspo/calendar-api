const { validationResult } = require("express-validator");
const auth = {};

auth.crearUsuraio = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    return res.status(201).json({ messgae: "Usuario creado" });
  } catch (error) {
    console.log(error);
  }
};

auth.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    return res.status(202).json({ messgae: "Login" });
  } catch (error) {
    console.log(error);
  }
};

auth.renovarToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    return res.status(202).json({ messgae: "Login" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
