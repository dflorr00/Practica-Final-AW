const express = require('express');
const { getUser, createUser } = require('../model/connection');
const _ = require("lodash");
const router = express.Router();



router.post('/', async function (req, res) {

    var userIdent = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var surname= req.body.surname;
    var name = req.body.name;
    var type= req.body.type;



    if (_.isEmpty(await getUser(userIdent))) {
        await createUser(userIdent, password, email, name, surname, type);
        res.send("Created New User");
    } else {
        res.status(409).send("Registration Failed: User already Created");
    }
});

module.exports = router;