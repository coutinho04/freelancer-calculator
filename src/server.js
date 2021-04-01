import express from 'express';
import routes from './routes.js';

const server = express();

// habilitar template engine
server.set('view engine', 'ejs');

// habilitar arquivos estaticos
server.use(express.static('public'));

// habilitar req.body
server.use(express.urlencoded({ extended: true }));

// utilizar as rotas
server.use(routes);

server.listen(3000, () => console.log('rodando'));
