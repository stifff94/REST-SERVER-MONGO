const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation');
// validaciones para ciertas variables o entidades de la base de datos
let rolesValidos = {
    values: ['ADMIN_ROLE', "USER_ROLE"],
    message: '{VALUE} no es un rol válido'
};
// cada esquema constituira un formate de ingreso a una entidad de la base
let Schema = mongoose.Schema;
// se inicializa un registro para el schema usuario, esta compuesto por las variables nombre,email,password,img,role,estado,goole
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        //se validan los tipos de roles configurados anteriormente
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    goole: {
        type: Boolean,
        default: false
    }
});
// funcion para validar el nuevo usuario ingresando el password
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}

// se valida que no haya ningun usuario a traves de la validacion de usuario
usuarioSchema.plugin(uniqueValidator);
// se exporta para crear la nueva entrada en el collection usuario, si este no existe se creara
module.exports = mongoose.model('Usuario', usuarioSchema);