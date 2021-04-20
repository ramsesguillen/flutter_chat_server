const mongoose = require('mongoose');

// 1EHzTm9hOqaKW8zc
// flutter_fr
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('Base de datos online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}


module.exports = {
    dbConnection
}
