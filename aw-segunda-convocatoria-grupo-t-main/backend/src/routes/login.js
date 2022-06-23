const express = require('express');
const config = require('config');
const router = express.Router();
const jwt = require("jsonwebtoken");

const {testUser, getUser} = require("../model/connection");

router.post('/login', async function(req, res){
    userIdent = req.body.user;
    password = req.body.password;

    var user = await testUser(userIdent, password);
    if(user){
        const body = { _id: user._id, user: user.username, expiration: Date.now() + 60*60*1000};
        const token = jwt.sign(JSON.stringify(body), process.env.TOKEN_KEY || config.get("TOKEN_KEY"));
        res.contentType('json');
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.SECURE || Number.parseInt(config.get("SECURE"))
        })
        res.cookie('user', user.username);
        res.cookie('type', user.type);
        res.status(200).send(token);
    }else {
        res.status(404).send("Authentication Error: User not found");
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies['jwt']) {
        res.clearCookie('jwt');
        res.clearCookie('user');
        res.clearCookie('type');
        
        res.status(200)
        .json({
            message: 'You have logged out'
        })
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        })
    }
})

module.exports = router;