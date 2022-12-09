const express = require('express')
const AuthController = require("../controllers/authController.js");

const router = express.Router();

router
    .post('/register.html', AuthController.criarUser)
    .post('/', (req, res) =>{
        var email = AuthController.validarEmail
        var password = AuthController.validarSenha
        console.log(email, password)
        if(email == 1 && password == 1){
            req.session.login = login;
            res.render('chat')
            console.log('Usuário logado:' + req.session.login)
        }
        else{
            console.log('Erro ao logar')
            res.render('index')
        }
    })

module.exports = router