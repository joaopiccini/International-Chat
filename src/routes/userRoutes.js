const express = require('express')
const AuthController = require("../controllers/authController.js")

const router = express.Router();

router
    .post('/', AuthController.validarAcesso)
    .post('/register.html', AuthController.criarUser)
    .post('/logout', AuthController.desconectarUser)

module.exports = router