const express = require('express');
const config = require('config');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { createGroup, getGroups, deleteGroup,getGroupUsers, joinGroup, leaveGroup } = require("../model/connection");

// Crear grupo
router.post('/', async function (req, res) {
    await createGroup(req.body.name, req.body.firstmember).then((result) => {
        if(result){
            res.status(201).send("Group created");
        }else{
            res.status(400).send("Group could not be created");
        }
        
    });
});


// Obtener grupos del usuario
router.get('/:user', async function (req, res) {
    await getGroups(req.params.user).then((data) => {
        res.status(200).send(data);
    });
});

// Añadir usuario a un grupo a un grupo
router.post('/join', async function (req, res) {
    await joinGroup(req.body.name, req.body.newMember).then((result) => {
        if(result){
        res.status(200).send("Group joined");
        }else{
            res.status(400).send("Failed to join");
        }
    });
});

// Eliminar grupo
router.delete('/:group', async function (req, res) {
    await deleteGroup(req.params.group).then(() => {
        res.status(200).send("Group deleted");
    });
});

// Eliminar usuario de un grupo
router.put('/leave', async function (req, res) {
    await leaveGroup(req.body.group, req.body.member).then((data) => {
        res.status(data.code).send(data.message);

    });
});


// Obtener usuarios de un grupo
router.get('/:groupname/users', async function (req, res) {
    await getGroupUsers(req.params.groupname).then((data) => {
        res.status(200).send(data);
    });
});

module.exports = router;
