// ====================
// Puerto
// ====================
// se inicializa el puerto para las llamadas del servidor
process.env.PORT = process.env.PORT || 3000;

// ====================
// Base de Datos
// ====================
// let urlDB;
// este comando if puede ser utilizado para guardar los archivos en un espacio local o en la nube
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
// se inicializa coloca el destino para guardar la base de datos
// en este caso se utilizará un acceso a mongodb online
urlDB = 'mongodb+srv://cafe-user:VtYmPKmzZlQOs0Oh@cluster0-3ub6d.gcp.mongodb.net/cafe'
    // }

// se inicializa el enlace para el guardado de datos
process.env.URLDB = urlDB;