const {query} = require('../database/connectionMysql');

module.exports = {
    create(req, res){
        idModulo = 4
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Notas, evento registrado: " + data);
                    }
            });
    },

    boletimCreate(req, res){
        idModulo = 5
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Nota/Boletim, evento registrado: " + data);
                    }
            });
    },
    
    historicoCreate(req, res){
        idModulo = 6
        data = new Date().toLocaleString()
            query(`INSERT INTO log 
            (idUsuarioFK, horarioAcesso, idModuloFK) 
            VALUES 
            ('${req.userId}', '${data}', '${idModulo}')`,
             function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json("Aluno entrou nas Nota/Historico, evento registrado: " + data);
                    }
            });
    }
}
