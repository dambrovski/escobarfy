const { query } = require('../database/connectionMysql');

function buscarLogsPorUsuario(req, res) {
	let fetch =
		'SELECT c.email as usuario, b.nome as modulo, a.horarioAcesso FROM logs AS a INNER JOIN modulos AS b ON a.idModulo = b.idModulo INNER JOIN usuario AS c ON a.idUsuario = c.idUsuario';
	fetch +=
		req.query && req.query.id
			? ' WHERE a.idUsuario=' + parseInt(req.query.id)
			: '';
	fetch += ' ORDER BY a.horarioAcesso';

	query(fetch, (error, result) => {
		res.json(error || result);
	});
}

async function inserirLog(req, res) {
	const fetch = `INSERT INTO logs(idUsuario, idModulo) VALUES ('${req.body.idUsuario}', '${req.body.idModulo}')`;
	const fetchModulo = `SELECT nome FROM modulos WHERE idModulo = ${req.body.idModulo}`;
	try {
		await query(fetch);
		query(fetchModulo, (error, result) => {
			const SUCCESS = `O usuario acessou ${
				result[0].nome
			} com sucesso as ${new Date()}`;
			res.json(error || SUCCESS);
		});
	} catch (err) {
		res.json(err || SUCCESS);
	}
}

module.exports = { buscarLogsPorUsuario, inserirLog };
