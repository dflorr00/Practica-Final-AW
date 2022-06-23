const express = require('express');
const router = express.Router();
const usuarios = require("../datos");

//GET,"/users":devuelve una lista con el nombre de todos los usuarios.
router.get('/users', (req, res)=> {
    let devolver=[];
    usuarios.forEach(no => devolver.push(no.nombre))
    res.json(devolver);
});

module.exports = router;