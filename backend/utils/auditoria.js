const auditoria = require('../models/auditoriaModels.js');


const  registrarAuditoria = async ( tarea, id_admin, id_producto = null) => {
    try {
        await auditoria.create({
            tarea_realizada: tarea,
            fecha: new Date(),
            id_admin,
            id_producto
        });
    } catch (error) {
        console.error("Error al registrar auditoría:", error);
    }
};

module.exports = registrarAuditoria;