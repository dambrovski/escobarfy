const { query } = require('../database/connectionMysql');

const BADREQUEST = 'O nome do módulo é obrigatório';
const SUCCESS = 'O Módulo foi inserido com sucesso!';

function adicionarModulo(req, res) {
	if (!req.body.nome) {
		res.status(400).send(BADREQUEST);
	} else {
		const fetch = `INSERT INTO modulos(nome) VALUES ('${req.body.nome.toUpperCase()}')`;

		query(fetch, (err) => {
			res.json(err || SUCCESS);
		});
	}
}

function listarModulos(req, res) {
	const fetch = `SELECT idModulo as modulo, nome FROM modulos`;

	query(fetch, (error, result) => {
		res.json(error || result);
	});
}

module.exports = { adicionarModulo, listarModulos };
