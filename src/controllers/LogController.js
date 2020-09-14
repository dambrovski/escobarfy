const {query} = require('../database/connectionMysql');

module.exports = {
    index(req, res){
        filter = ""
        if(req.body.id) filter = ' WHERE a.idUsuarioFK=' + parseInt(req.body.id);
        query("SELECT a.idLog, a.idUsuarioFK, b.email, a.horarioAcesso, a.idModuloFK, c.nomeModulo FROM log AS a INNER JOIN usuario AS b ON a.idUsuarioFK = b.idUsuario INNER JOIN modulo AS c ON a.idModuloFK = c.idModulo" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },
}