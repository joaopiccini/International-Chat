const User = require('../models/User.js')
const alert = require('alert')
const session = require('express-session')

class AuthController{

    static criarUser = async (req, res) => {
        const { email } = req.body
        if(await User.findOne({ email: email })){
            alert('Já existe um cadastro com esse E-mail')
            return res.redirect('register.html')
        }
        else{
            try{
                const user = await User.create(req.body)
                alert('Usuário cadastrado com sucesso')
                return res.redirect('/')
            }
            catch(err){
                console.log(err)
                return alert('Erro ao criar usuário')
            }
        }
    }

    static validarAcesso = async (req, res) => {
        const { email } = req.body
        const { password } = req.body
        const { name } = req.body
        var dadosValidacao = await User.findOne({ email: email })
        if(dadosValidacao.email == email && dadosValidacao.password == password){
            req.session.cookie('User', name)
            console.log(req.session.cookie)
            res.render('chat')
            console.log('Usuário logado:' + req.session.login)
        }
        else{
            alert('Usuário ou senha inválidos')
            res.render('index')
        }
    }

    static desconectarUser = async (req, res) => {
        req.session.destroy();
        res.clearCookie(this.cookie, { path: '/' });
        alert('Desconectado com sucesso')
        return res.redirect('/')
    }

}

module.exports = AuthController