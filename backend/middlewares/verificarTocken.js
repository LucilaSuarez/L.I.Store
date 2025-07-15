const jwt  = require('jsonwebtoken');


const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(' ')[1]; // Formato: "Bearer token_aqui"

    if (!token) {
        return res.status(401).json({ message: "Token no válido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa tu secreto del .env
        req.admin = {
            id_admin: decoded.id_admin,
            nombre: decoded.nombre, 
            email: decoded.email
        }; // Guarda la información del admin en el request
        next(); // Continúa al controlador
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};

module.exports = verificarToken;