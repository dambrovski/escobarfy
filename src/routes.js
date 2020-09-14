const express = require('express');
const cors = require('cors')
var jwt = require('jsonwebtoken');

const FinanceiroController = require('./controllers/FinanceiroController');
const NotaController = require('./controllers/NotaController');
const SecretariaController = require('./controllers/SecretariaController');
const UsuarioController = require('./controllers/UsuarioController');
const SessionController = require('./controllers/SessionController');
const LogController = require('./controllers/LogController');

const routes = express.Router();

routes.post('/', SessionController.create);
routes.post('/login', SessionController.create);
routes.post('/alterarDados', verifyJWT, UsuarioController.alterarDados);
routes.post('/auditoria', LogController.index);

routes.post('/financeiro', verifyJWT, FinanceiroController.create);
routes.post('/financeiro/negociacao', verifyJWT, FinanceiroController.negociacaoCreate);
routes.post('/financeiro/emitirBoleto', verifyJWT, FinanceiroController.emitirBoletoCreate);

routes.post('/nota', verifyJWT, NotaController.create);
routes.post('/nota/boletim', verifyJWT, NotaController.boletimCreate);
routes.post('/nota/historico', verifyJWT, NotaController.historicoCreate);

routes.post('/secretaria', verifyJWT, SecretariaController.create);
routes.post('/secretaria/servicos', verifyJWT, SecretariaController.ServicosCreate);
routes.post('/secretaria/entregardocumentos', verifyJWT, SecretariaController.EntregarDocumentosCreate);


function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });      
      req.userId = decoded.id;
      next();
    });
    
}

module.exports = routes;



