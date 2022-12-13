const express = require('express')
const app = require("../../server.js")
const users = require("./userRoutes.js")
const AuthController = require("../controllers/authController.js")

const routes = (app) => {

    app.get('/', (req, res) =>{
        return res.render('index')
    })

    app.get('/forgot', (req, res) =>{
        return res.render('forgot')
    })

    app.get('/register.html', (req, res) =>{
        return res.render('register')
    })

    app.get('/chat', (req, res) =>{
        return res.render('chat')
    })

    app.use(
        express.json(),
        users,
    )

}

module.exports = routes