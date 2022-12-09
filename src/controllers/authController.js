const User = require('../models/User.js')

class AuthController{

    static criarUser = async (req, res) => {
        const { email } = req.body
        if(await User.findOne({ email })){
            return res.status(400).send('Já existe um usuário com este E-mail')
        }
        else{
            try{
                const user = await User.create(req.body)
                return res.render('index')
            }
            catch(err){
                console.log(err)
                return res.status(400).send('Erro ao criar usuário')
            }
        }
    }

    static validarEmail = async (req, res) => {
        const { email } = req.body
        console.log('o email é ' + email)
        var validarEmail = email == await User.findOne({ email: email }) ? 1 : 0
        console.log('validarEmail: ' + validarEmail)
        return res.send(validarEmail)
    }
    
    static validarSenha = async (req, res) => {
        const { password } = req.body
        console.log('a senha é ' + password)
        var validarSenha = password == await User.findOne({ password: password }) ? 1 : 0
        return res.send(validarSenha)
    }

}

module.exports = AuthController