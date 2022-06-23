const express = require('express');
const usuarios = require('../datos');
const router = express.Router();

//INICIO
router.get('/', (req, res) =>{
    res.send(
    "<h1>Iniciar sesion</h1>"+
    "Rutas:"+
    "<ol>"+
        "<li>GET/users --> devuelve la lista de usuarios</li>"+
        "<li>GET/:user/notes --> devuelve las notas de usuarios</li>"+
        "<li>DELETE/:user/notes/:note --> elimina una nota</li>"+
        "<li>POST/:user/notes --> crea una nueva nota en el usuario</li>"+
        "<li>POST/login --> recibe el usuario y contraseña y realiza la autenticación</li>"+
        "<li>PUT/:user/notes/:note --> edita una nota</li>"+
    "</ol>"
    );
});

//POST,"/login":recibe el usuario y contraseña y realiza la autenticación.
router.post('/login',(req, res)=>{
    const cuerpo = req.body;
    const usuario = cuerpo.usuario;
    const contrasenia = cuerpo.clave;
    const logeado = usuarios.find(us=>us.nombre===usuario);
    if(logeado){
        if(contrasenia === ""){
            res.redirect(`/${usuario}/notes`);
        }else{
            res.send("Error de autenticacion");
        }
    }else{
        usuarios.push({"id":usuarios.length,"nombre":usuario,notas:[]});
    }
    res.status(204).end();
});

module.exports = router;