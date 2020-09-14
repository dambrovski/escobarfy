const {query} = require('../database/connectionMysql');

module.exports = {
    create(req, res){
        idModulo = 1
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou no Financeiro, evento registrado: " + data);
                    }
            });
    },

    negociacaoCreate(req, res){
        idModulo = 2
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou no Financeiro/Negociação, evento registrado: " + data);
                    }
            });
    },
    
    emitirBoletoCreate(req, res){
        idModulo = 3
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou no Financeiro/Boleto, evento registrado: " + data);
                }
            });
        }
    }
