// en este modulo se haran las peticiones al servidor conectado, para poder listas, modificar o crear los usuarios en la base
//de mongodb
//las llamadas modificadas son get,post,put,delete
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();
//llamada para listar los datos del usuario
app.get('/usuario', function(req, res) {
    //listamos un numero limite de registro para no saturar el servidor
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    //buscamos en cada registro, cada uno de los elementos del registro para listar
    Usuario.find({}, 'nombre email role goole img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //metodo para contar los usuarios registrados con el limite
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });
});
//llamada para agregar un usuario al registro
app.post('/usuario', function(req, res) {
    //el body es el cuerpo de los datos enviados, en este caso los datos llegan como un JSON
    let body = req.body;
    // cada uno de los elementos del body lo guardamos en una variable y la registramos en un objeto USUARIO
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //el password se encripta usando la libreria bycrypt
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });
    //se hace un llamado para registrar el usuario en la base de datos
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});
//llamado para modificar el usuario con nuevas validaciones usando el metodo put
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    /* Solucion no eficiente 
    delete body.password;
    delete body.goole;
    */
    //se hace un llamado para registrar las nuevas actualizaciones
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
//llamado para eliminar un usario de la base de datos
//NOTA: este método no es muy útil para un sistema debido a nunca es bueno eliminar registros de un database
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //se hace un al registro seleccionado a través de su id
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //mensaje de error si no se pudo borrar el usuario o no se encontró
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});
//se exporta el modulo app para hacer los llamados a traves del servidor
module.exports = app;