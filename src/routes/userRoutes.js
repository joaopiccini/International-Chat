const express = require('express')
const AuthController = require("../controllers/authController.js")

const router = express.Router();

router
    .get('/logout', AuthController.desconectarUser)
    .post('/', AuthController.validarAcesso)
    .post('/register.html', AuthController.criarUser)

module.exports = router