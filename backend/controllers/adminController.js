const AdministradorModels = require("../models/AdministradorModels.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }
  try {
    const administrador = await AdministradorModels.findOne({ where: { email } });

    if (!administrador) {
      return res.status(404).json({ message: "erorr al iniciar sesion" });
    }

    const isMatch = await bcrypt.compare(password, administrador.contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    
    const token = jwt.sign(
      {
       email: administrador.email,
        nombre: administrador.nombre_usuario,
        id_admin: administrador.id_admin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      email: administrador.email,
      nombre: administrador.nombre_usuario,
      id: administrador.id_admin,
      token: token
    });


  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { login };
