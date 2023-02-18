const jwt = require("jsonwebtoken");
const validarJWT = (req, res, next) => {
  const authorization = req.get("Authorization");
  let token = "";
  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ message: "No hay token en la petición" });
  }
  token = authorization.substring(7);
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = validarJWT;
