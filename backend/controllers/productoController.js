const productoModels = require('../models/productoModels.js');

/**
 * GET /productos
 * 
 * Controlador que obtiene productos desde la base de datos con filtros opcionales.
 * Permite filtrar por tipo de producto y por estado de activación.
 *
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} req.query.tipo - (opcional) Tipo de producto a filtrar (ej: 'celular', 'accesorio').
 * @param {Object} req.query.activo - (opcional) Si se desea filtrar por productos activos ('true') o inactivos ('false').
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * 
 * @returns {JSON} - Devuelve un array de productos filtrados, o un mensaje de error en caso de fallo.
 *
 * @example
 * // Obtener todos los productos activos tipo celular
 * GET /productos?tipo=celular&activo=true
 *
 * @example
 * // Obtener todos los accesorios sin importar si están activos
 * GET /productos?tipo=accesorio
 *
 * @example
 * // Obtener todos los productos
 * GET /productos
 */

const { QueryTypes } = require('sequelize');
const db = require('../data/db.js');
const registrarAuditoria = require('../utils/auditoria.js');

const getProductos = async (req, res) => {
  try {
    let query = "SELECT * FROM producto WHERE 1=1";
    const replacements = {};

    if (req.query.tipo) {
      query += " AND tipo_producto = :tipo";
      replacements.tipo = req.query.tipo;
    }
    if (req.query.activo) {
      query += " AND activo = :activo";
      replacements.activo = req.query.activo === "true" ? 1 : 0;
    }

    const productos = await db.query(query, {
      replacements,
      type: QueryTypes.SELECT
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error en getProductos:", error);
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
};


const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await productoModels.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}
const crearProducto = async (req, res) => {
  try {
    const {  tipo_producto, nombre, modelo, descripcion, precio, stock, activo } = req.body;
    if (tipo_producto === undefined || nombre === undefined || modelo === undefined || descripcion === undefined || precio === undefined || stock === undefined || activo === undefined || !req.file) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const imagen = req.file.filename;
    
    const nuevoProducto = await productoModels.create({
      tipo_producto,
      nombre,
      modelo,
      descripcion,
      precio,
      stock,
      activo,
      imagen
    }); 

    await registrarAuditoria(`Creó el producto "${nombre}"`, req.admin.id_admin, nuevoProducto.id_producto);
    
    res.status(201).json({ message: "Producto creado correctamente", producto: nuevoProducto });

  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;
   let { tipo_producto, nombre, modelo, descripcion, precio, stock, activo } = req.body;
activo = activo === true || activo === "true" ? 1 : 0;

        console.log("Valor recibido de 'activo':", activo, typeof activo);


    const producto = await productoModels.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await producto.update({
      tipo_producto,
      nombre,
      modelo,
      descripcion,
      precio,
      stock,
      activo
    });
    
    await registrarAuditoria(`Modificó el producto "${nombre}"`, req.admin.id_admin, producto.id_producto);
    res.status(200).json({ message: "Producto actualizado correctamente" });

  } catch (error) {
    console.error("Error al modificar el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

const desactivarProducto  = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoModels.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await producto.update({ activo: false });
    await registrarAuditoria(`Desactivó el producto "${producto.nombre}"`, req.admin.id_admin, producto.id_producto);
    res.status(200).json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  getProductos,
  obtenerProductoPorId,
  modificarProducto,
  crearProducto,
  desactivarProducto 
};


