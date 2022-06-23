const express = require("express");
const router = express.Router();

const { createMessage, getMessagesReceived, getMessagesSent } = require("../model/connection");

router.post("/messages", async function (req, res) {
    createMessage(req.body.issue, req.body.body, req.body.sender, req.body.receiver).then(()=>{
        res.status(200).send("Message created");
    }).catch((error)=>{
        res.status(400).send("No se ha enviado correctamente el mensaje")
    });
    
});

router.get("/:user/messages", async function (req, res) {
    getMessagesSent(req.params.user).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(404).send("No se ha podido coger los mensajes");
    });

});

router.get("/messages/:user", async function (req, res) {
    getMessagesReceived(req.params.user).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(404).send("No se ha podido cargar los mensajes");
    });
});

module.exports = router;