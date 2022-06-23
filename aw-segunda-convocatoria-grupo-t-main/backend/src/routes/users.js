const express = require("express");
const { editUser, getUser, createFile, getFileByName, removeFile} = require("../model/connection");
const router = express.Router();
const {fileUpload} = require("../middleware/middleware");
const _ = require("lodash");
const fs = require("fs");

router.get('/auth', function (req, res, next) {
    res.send("");
});

router.get('/:user', async function (req, res){
    user = await getUser(req.params.user);
    if(!_.isEmpty(user)){
        if(!_.isEmpty(user.password)) {
            user.password = "";
        }
        if(!_.isEmpty(user.image)){
            user.image.data = user.image.data.toString('base64');
        }
    }
    res.contentType('json');
    res.send(user);
});

router.put('/:user',fileUpload.single('image'), async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var surname= req.body.surname;
    var name = req.body.name;
    let image=null;
    if (req.file) {
        pr_image = await getFileByName(`${req.params.user}_image`);
        console.log(pr_image);
        if(!_.isEmpty(pr_image)){
            await removeFile(pr_image._id);
        }
        let data = fs.readFileSync(req.file.path);

        id = await createFile(`${req.params.user}_image`, Buffer.from(data), req.file.mimetype);
        image = id;
        
    }
    var status=await editUser(req.params.user, username, name, surname, email, password, image);
    if (status) {
        res.status(200).send("User Edited");
    } else {
        res.status(400).send("Error: User not edited");
    }
});

module.exports = router;