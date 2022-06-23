const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/notas.js'));
app.use('/',require('./routes/users.js'));

//ERROR 404
app.use((request, response, next) => {
    response.status(404).send("<H1>ERROR 404</H1>");
})

const PORT = 3001
app.listen(PORT,()=>{console.log('Server running on port:',PORT)})