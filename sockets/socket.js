const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprovarJWT } = require('../helpers/generar-jwt');
const { io } = require('../index');



// Mensajes de Sockets
io.on('connection', async client => {
    console.log('Cliente conectado');

    // Cliente con jwt
    // console.log( client.handshake.headers['x-token']);
    const [ valido, uid ] = comprovarJWT( client.handshake.headers['x-token'] );

    if ( !valido ) return client.disconnect();
    console.log('autenticado');

    await usuarioConectado( uid );

    // Ingresar al usuario a una sala en partiular
    // sala global
    client.join( uid );

    // Escuchar el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        console.log( payload );
        await grabarMensaje( payload );

        io.to( payload.para ).emit('mensaje-personal', payload );
    })


    client.on('disconnect', () => {
        usuarioDesconectado( uid );
        // console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        // console.log('Mensaje', payload);

        // io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
