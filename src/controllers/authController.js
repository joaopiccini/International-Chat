const express = require('express')
const User = require('../models/User.js')

const router = express.Router()

router.post('/registrar', async (req, res) => {
    const { email } = req.body
    if( await User.findOne({ email })){
        return res.status(400).send('Já existe um usuário com este E-mail')
    }
    else{
        try{
            const user = await User.create(req.body)
            return res.status(201).send('Usuário criado com sucesso')
        }
        catch(err){
            return res.status(400).send('Erro ao criar usuário')
        }
    }
})