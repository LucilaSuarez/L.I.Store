const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const detalleVenta = db.define('detalle_venta', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
            key: 'id_producto'
        }
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ticket',
            key: 'id_venta'
        }
    }
}, {
    tableName: 'detalle_venta',
    timestamps: false
});

module.exports = detalleVenta;