const { Router, response } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

/**

    path: /api/mensajes

 */


router.get('/:de', validarJWT, obtenerChat )


module.exports = router;