const {query} = require('../database/connectionMysql');
const Session = require("../models/session");
var jwt = require('jsonwebtoken');

let session = new Session;

module.exports = {    
    create(req, res){   
        if(req.body.email && req.body.senha) filter = " WHERE email='" + req.body.email;
        query("SELECT * FROM usuario" + filter + "'" + "AND senha='" + req.body.senha + "'", function (error, result, field) {
            if (result.length < 1) {
                res.status(500).json({message: 'Login inválido!'});
            } else {
                const id = result[0].idUsuario;
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 30000 
                    });
                return res.json({ auth: true, token: token });
            }
        });
    }
}