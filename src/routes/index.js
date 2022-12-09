const express = require('express')
const app = require("../../server.js");
const users = require("./userRoutes.js");
const user = require('../models/User.js')

const routes = (app) => {

    app.get('/', (req, res) =>{
        if(req.session.email){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.email)
        }
        else{
            res.render('index')
        }
    })

    app.get('/forgot', (req, res) =>{
        if(req.session.email){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.email)
        }
        else{
            res.render('forgot')
        }
    })

    app.get('/register.html', (req, res) =>{
        if(req.session.email){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.email)
        }
        else{
            res.render('register')
        }
    })

    app.use(
        express.json(),
        users,
    )

}

module.exports = routes