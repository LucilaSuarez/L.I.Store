// ventaController.js
const db = require('../data/db.js');
const Ticket = require('../models/ticketModels.js');
const Detalle_venta = require('../models/detalleVentaModels.js');

const createVenta = async (req, res) => {
    try {
        const { nombre_usuario, fecha, total, detalles } = req.body;
        // 1. Crear el ticket
        const newVenta = await Ticket.create({
            nombre_usuario,
            fecha,
            total
        });
        // 2. Crear detalles de la venta (si vienen varios productos)
        if (Array.isArray(detalles)) {
            for (const detalle of detalles) {
                await Detalle_venta.create({
                    cantidad: detalle.cantidad,
                    precio_unitario: detalle.precio_unitario,
                    id_producto: detalle.id_producto,
                    id_venta: newVenta.id_venta
                });
            }
        }

        res.status(201).json({ message: 'Venta y detalles creados correctamente', venta: newVenta });
    } catch (error) {
        console.error('Error al crear venta:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getVentas = async (req, res) => {
    try {
        const ventas = await Ticket.findAll();
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    createVenta: createVenta,
    getVentas: getVentas
};