const {query} = require('../database/connectionMysql');

module.exports = {
    alterarDados(req, res){
        filterEmail = ""
        filterSenha = ""
        filterId = "WHERE idUsuario = " + req.userId
        virg = ""
        data = new Date().toLocaleString()

        if(req.body.email) filterEmail = "email='" + req.body.email + "'";
        if(req.body.senha) filterSenha = "senha='" + req.body.senha + "'";
        if(req.body.senha && req.body.senha) virg = ','
        query(`UPDATE usuario SET ${filterEmail} ${virg} ${filterSenha} ${filterId}`,
         function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json("Aluno entrou na Alteração de Dados, dados alterados com sucesso: " + data);
            }
        });
    },
}
