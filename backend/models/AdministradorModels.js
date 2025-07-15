const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const Administrador = db.define('administrador', {
    id_admin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'administrador',
    timestamps: false

})

module.exports = Administrador;