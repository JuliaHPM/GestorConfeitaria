const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const bodyParser = require("body-parser");

require('./src/database/index'); //pegar a conexão do sequelize
// require('dotenv').config({ path: '../.env'}); //para utilizar o .env

require('dotenv').config()

const app = express();

//midleware
// rota que pode chamar o backend
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// body parser ->  bodyParser serve para trabalhar com os dados vindo do cliente.
// Quando o cliente manda dados via form payload, esse pacote ele formata e transforma os dados para o formato de objeto javascript e joga tudo isso em um objeto dentro do objeto de requisição (req): req. body.
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(routes);

app.listen(3333);