var jwt = require('jsonwebtoken');
const util = require('util');
const { connection } = require('../database/connectionMysql');

const query = util.promisify(connection.query).bind(connection);

async function checkHavePermission(token, permission = 2) {
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.SECRET);
	} catch (err) {
		return false;
	}
	const fetch = `SELECT * FROM usuario WHERE idUsuario = ${decoded.id} and permissao = ${permission}`;
	try {
		const result = await query(fetch);
		return result.length ? true : false;
	} catch (err) {
		throw new Error(err);
	}
}

function checkIsValid(req, res, next) {
	var token = req.headers['x-access-token'];
	if (!token)
		return res.status(401).json({ auth: false, message: 'No token provided.' });

	jwt.verify(token, process.env.SECRET, function (err, decoded) {
		if (err)
			return res
				.status(500)
				.json({ auth: false, message: 'Failed to authenticate token.' });
		req.userId = decoded.id;
		next();
	});
}

module.exports = { checkHavePermission, checkIsValid };
