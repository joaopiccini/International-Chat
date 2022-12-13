const User = require('../models/User.js')
const alert = require('alert')

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
                return res.redirect('/chat')
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
        var dadosValidacao = await User.findOne({ email })
        if(dadosValidacao.email == email && dadosValidacao.password == password){
            res.render('chat')
            console.log('Usuário logado:' + req.session.login)
        }
        else{
            alert('Usuário ou senha inválidos')
            return res.render('index')
        }
    }

    static desconectarUser = async (req, res) => {
        alert('Desconectado com sucesso')
        return res.redirect('/index.html')
    }

}

module.exports = AuthController