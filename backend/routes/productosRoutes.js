const express = require('express');
const router = express.Router();
const { getProductos, obtenerProductoPorId, modificarProducto ,crearProducto, desactivarProducto} = require('../controllers/productoController');
const verificarToken = require('../middlewares/verificarTocken.js');
const validarProducto = require('../middlewares/validarProducto.js');
const multer = require('../middlewares/multerConfig.js');

router.get('/', getProductos);
router.get('/:id', obtenerProductoPorId);

router.put('/:id',verificarToken,validarProducto,modificarProducto);

router.post('/', verificarToken,multer.single("imagen"),validarProducto,crearProducto);

router.patch('/:id/desactivar',verificarToken,desactivarProducto);

module.exports = router;