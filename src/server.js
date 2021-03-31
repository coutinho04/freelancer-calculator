import express from 'express';
import routes from './routes.js';

const server = express();

server.set('view engine', 'ejs');

server.use(express.static('public'));
server.use(routes);

server.listen(3000, () => console.log('rodando'));
