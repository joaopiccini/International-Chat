const User = require('../models/User.js')
const alert = require('alert')

class AuthController{

    static criarUser = async (req, res) => {
        const { email } = req.body
        if(await User.findOne({ email })){
            alert('Já existe um cadastro com esse E-mail')
            return res.render('register')
        }
        else{
            try{
                const user = await User.create(req.body)
                return res.render('index')
            }
            catch(err){
                console.log(err)
                return alert('Erro ao criar usuário')
            }
        }
    }

}

module.exports = AuthController