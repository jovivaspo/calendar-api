const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const generarJWT = require("../helpers/jwt");

const auth = {};

auth.crearUsuraio = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: "Email en uso" });
    }

    const newUsuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();

    newUsuario.password = bcrypt.hashSync(password, salt);

    const usuarioSaved = await newUsuario.save();

    const token = await generarJWT(usuarioSaved.id, usuarioSaved.name);

    return res.status(201).json({
      uid: usuarioSaved.id,
      name: usuarioSaved.name,
      token,
    });

    return res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Por favor, hable con el administrador",
    });
  }
};

auth.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(401).json({ message: "Email no registrado" });
      }

      const validPassword = bcrypt.compareSync(password, usuario.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = await generarJWT(usuario.id, usuario.name);

      return res.status(201).json({
        uid: usuario.id,
        name: usuario.name,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Por favor, hable con el administrador",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

auth.renovarToken = async (req, res) => {
  try {
    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    return res.status(201).json({ uid, name, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
