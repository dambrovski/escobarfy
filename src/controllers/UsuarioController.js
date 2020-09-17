const { query } = require('../database/connectionMysql');
var jwt = require('jsonwebtoken');
const { checkHavePermission } = require('../utils/validaJwt');

const USUARIO_NAO_EXISTE_OU_NAO_POSSUI_PERMISSAO =
	'Usuario não existe ou não possui permissão para executar a ação';

const USUARIO_CRIADO = 'Usuario criado com sucesso';

const FAILED = 'Falha ao criar o usuario';

async function adicionarUsuario(req, res) {
	const token = req.headers['x-access-token'];
	const fetch = `INSERT INTO usuario(email, senha, permissao) VALUES ('${req.body.email}', '${req.body.senha}', '${req.body.permissao}')`;
	try {
		const hasPermission = await checkHavePermission(token);
		if (hasPermission) {
			query(fetch, (error) => {
				res.send(error ? FAILED : USUARIO_CRIADO);
			});
		} else {
			res.send(USUARIO_NAO_EXISTE_OU_NAO_POSSUI_PERMISSAO);
		}
	} catch (err) {
		res.json(err);
	}
}

async function updateUsuario(req, res) {
	const token = req.headers['x-access-token'];
	const { email, permissao, senha } = req.body;
	let filterList = [];
	let filter = 'UPDATE usuario SET';
	if (permissao) {
		try {
			if (await checkHavePermission(token)) {
				filterList.push({ permissao });
			} else {
				res.send(
					'Você não possui permissão para atualizar as permissões de usuario.'
				);
			}
		} catch (err) {
			res.send('Falha ao buscar permissões de usuario');
		}
	}

	if (email) {
		filterList.push({ email });
	}

	if (senha) {
		filterList.push({ senha });
	}

	filterList.forEach((element) => {
		const name = Object.keys(element);
		const el =
			typeof element[name] === 'string' ? `'${element[name]}'` : element[name];
		filter += ` ${name} = ${el},`;
	});

	filter = `${filter.slice(0, -1)} WHERE idUsuario = ${req.userId}`;
	data = new Date().toLocaleString();
	try {
		const result = await query(filter);
		if (result.error) {
			res.json('Falha ao alterar os dados');
		}
		res.json(
			'Aluno entrou na Alteração de Dados, dados alterados com sucesso: ' + data
		);
	} catch (err) {
		res.json(err);
	}
}

module.exports = {
	updateUsuario,
	adicionarUsuario,
};
