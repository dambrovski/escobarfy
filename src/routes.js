const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');

const UsuarioController = require('./controllers/UsuarioController');
const SessionController = require('./controllers/SessionController');
const LogsController = require('./controllers/LogsController');
const ModulosController = require('./controllers/ModulosController');
const { checkIsValid } = require('./utils/validaJwt');

const routes = express.Router();

routes.post('/modulos/novo', checkIsValid, ModulosController.adicionarModulo);
routes.get('/modulos/listar', checkIsValid, ModulosController.listarModulos);

routes.post('/usuario/novo', checkIsValid, UsuarioController.adicionarUsuario);
routes.post(
	'/usuario/atualizar',
	checkIsValid,
	UsuarioController.updateUsuario
);

routes.get('/log/user', checkIsValid, LogsController.buscarLogsPorUsuario);
routes.post('/log/novo', checkIsValid, LogsController.inserirLog);

routes.post('/login', SessionController.create);

module.exports = routes;
