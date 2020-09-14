const {query} = require('../database/connectionMysql');

module.exports = {
    create(req, res){
        message = ""
        idModulo = 7
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Secretaria, evento registrado: " + data);
                    }
            });
    },

    ServicosCreate(req, res){
        idModulo = 8
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Secretaria/Servicos, evento registrado: " + data);
                    }
            });
    },
    
    EntregarDocumentosCreate(req, res){
        idModulo = 9
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Secretaria/EntregarDocumentos, evento registrado: " + data);
                    }
            });
    },
    
}