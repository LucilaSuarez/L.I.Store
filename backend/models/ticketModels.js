const db = require ('../data/db.js');
const { DataTypes } = require('sequelize');

const ticket = db.define('ticket', {
    id_venta : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'ticket',
    timestamps: false
});
module.exports = ticket;