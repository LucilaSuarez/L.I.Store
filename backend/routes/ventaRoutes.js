const express = require('express');
const router = express.Router();
const { createVenta, getVentas } = require('../controllers/ventaController');

router.post('/', createVenta);
router.get('/', getVentas);

module.exports = router;
