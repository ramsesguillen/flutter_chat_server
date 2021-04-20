const { response, request } = require("express");
const jwt = require('jsonwebtoken');



const validarJWT = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay tojen en la peticion'
        });
    }


    try {
        const { uid } = jwt.verify(
            token,
            process.env.SECRETPRIVATEKEY
        );

        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}



module.exports = {
    validarJWT
}