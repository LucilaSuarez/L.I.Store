const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const auditoria = db.define('auditoria', {
    id_auditoria:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea_realizada: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'administrador',
            key: 'id_admin'
        } 
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'producto',
            key: 'id_producto'
        }
    }
}, {
    tableName: 'auditoria',
    timestamps: false
});

module.exports = auditoria;