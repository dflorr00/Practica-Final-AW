const express = require('express');
const router = express.Router();
const usuarios = require("../datos");

//GET,"/:user/notes":devuelve la lista de notas del usuario.
router.get('/:user/notes', (req, res)=> {
    const eleccion = req.params.user;
    const datos = usuarios.find(no => no.nombre===eleccion);
    res.json(datos.notas);
});

//POST,"/:user/notes":crea una nueva nota en el usuario. Los datos se envían en el body
router.post('/:user/notes',(req,res)=>{
    const nombre = req.params.user;
    const datos = usuarios.find(no => no.nombre===nombre);
    const indice = datos.notas.at(datos.notas.length-1).id+1;
    const titulo = req.body.Titulo;
    datos.notas.push({'id':indice,titulo,'Contenido':''});
    res.send(req.body.Titulo);
});

//PUT,"/:user/notes/:note":edita una nota. Los datos se envían en el body.
router.put('/:user/notes/:note', (req,res)=>{
    const nombre = req.params.user;
    const nota = Number(req.params.note);
    const cuerpo = req.body;

    const datos = usuarios.find(no => no.nombre===nombre);
    const ella = datos.notas.forEach(no =>{
        if(no.id===nota){
            no.Titulo = cuerpo.Titulo;
            no.Contenido = cuerpo.Contenido;
        }
    });
    res.send(usuarios);
    res.status(204).end();
});

//DELETE,"/:user/notes/:note":elimina una nota.
router.delete('/:user/notes/:note',(req,res)=>{
    const nombre = req.params.user;
    const nota = Number(req.params.note);
    const datos = usuarios.find(no => no.nombre===nombre);
    const restantes = datos.notas.filter(no => no.id!=nota);
    datos.notas = restantes;
    res.status(204).end();
});

module.exports = router;