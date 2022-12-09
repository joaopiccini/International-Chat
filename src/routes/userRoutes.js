const express = require('express')
const AuthController = require("../controllers/authController.js")
const User = require('../models/User.js')
const session = require('express-session')

const router = express.Router();

router
    .post('/register.html', AuthController.criarUser)
    .post('/', async (req, res) => {
        const { email } = req.body
        const { password } = req.body
        var validacaoEmail = await User.findOne({ email: email }) ? 1 : 0
        var validacaoPassword = await User.findOne({ password: password }) ? 1 : 0
        if(validacaoEmail == 1 && validacaoPassword == 1){
            res.render('chat')
            console.log('Usuário logado:' + req.session.login)
        }
        else{
            console.log('Erro ao logar')
            res.render('index')
        }
    })

module.exports = router