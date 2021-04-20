const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/generar-jwt");


const crearUsuario = async ( req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese correo ya existe',
            });
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en conexion',
        });
    }

}




const login = async( req, res = response ) => {

    const { email, password } = req.body;


    try {
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar jwt
        const token = await generarJWT( usuario.id );

        res.status(201).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}



const revalidarUsuario = async( req, res = response ) => {

    const { uid } = req;
    // generar un nuevo token
    const token = await generarJWT( uid );
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        usuario,
        token
    })
}






module.exports = {
    crearUsuario,
    login,
    revalidarUsuario
}