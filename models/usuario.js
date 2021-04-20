
const { Schema, model } = require('mongoose');


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La constraseña  es obligatorio'],
    },
    online: {
        type: Boolean,
        default: false
    },
});

// Eliminar el password del objeto
UsuarioSchema.methods.toJSON = function() {
    const { _id, __v, password, ...usuario } = this.toObject();
    return {
        ...usuario,
        uid: _id
    };
}

// *el mobre del modelo es en singlular - pero mongoose le agrega una "s" en la coleccion
module.exports = model( 'Usuario', UsuarioSchema );









