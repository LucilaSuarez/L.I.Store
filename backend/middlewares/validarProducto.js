module.exports = (req, res, next) => {
    const {
        tipo_producto,
        nombre,
        modelo,
        descripcion,
        precio,
        stock,
        activo
    } = req.body;

    // Convertir tipos
    const precioNum = Number(precio);
    const stockNum = Number(stock);
    const activoBool = activo === "1" || activo === "true";

    // Validaciones básicas
    if (
        !tipo_producto || !nombre || !modelo || !descripcion ||
        isNaN(precioNum) || isNaN(stockNum) || activo === undefined
    ) {
        return res.status(400).json({ message: "Se deben completar todos los campos correctamente" });
    }

    if (precioNum <= 0) {
        return res.status(400).json({ message: "El precio debe ser un número positivo" });
    }

    if (stockNum < 0) {
        return res.status(400).json({ message: "El stock debe ser un número no negativo" });
    }

    if (typeof tipo_producto !== 'string' || typeof nombre !== 'string' || typeof modelo !== 'string' || typeof descripcion !== 'string') {
        return res.status(400).json({ message: "Los campos tipo_producto, nombre, modelo y descripcion deben ser cadenas de texto" });
    }

    if (tipo_producto.length > 45 || nombre.length > 20 || modelo.length > 30 || descripcion.length > 350) {
        return res.status(400).json({ message: "Los campos tienen un límite de caracteres" });
    }


    req.body.precio = precioNum;
    req.body.stock = stockNum;


    next();
};
