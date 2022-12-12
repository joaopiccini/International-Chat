const express = require('express')
const app = require("../../server.js")
const users = require("./userRoutes.js")
const AuthController = require("../controllers/authController.js")

const routes = (app) => {

    app.get('/', (req, res) =>{
        if(req.session.id){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.id)
        }
        else{
            res.render('index')
        }
    })

    app.get('/forgot', (req, res) =>{
        if(req.session.id){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.id)
        }
        else{
            res.render('forgot')
        }
    })

    app.get('/register.html', (req, res) =>{
        if(req.session.id){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.id)
        }
        else{
            res.render('register')
        }
    })

    app.get('/chat', (req, res) =>{
        if(req.session.id){
            res.render('chat')
            console.log('Usuário logado: ' + req.session.id)
        }
        else{
            res.render('chat')
        }
    })

    app.use(
        express.json(),
        users,
    )

}

module.exports = routes