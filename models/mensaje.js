
const { Schema, model } = require('mongoose');


const MensajeSchema = new Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Eliminar el password del objeto
MensajeSchema.methods.toJSON = function() {
    const { _id, __v, ...object } = this.toObject();
    return object;
}

// *el mobre del modelo es en singlular - pero mongoose le agrega una "s" en la coleccion
module.exports = model( 'Mensaje', MensajeSchema );









