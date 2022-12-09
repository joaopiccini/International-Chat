const express = require('express')
const session = require('express-session')
const db = require('./src/config/dbConnect.js')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./src/routes/index.js')

// Banco de dados
db.on("error", console.log.bind(console, "Erro ao conectar no banco"));
db.once("open", () => {
    console.log("Banco de dados conectado com sucesso");
})

// Aplicação web e socket
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

// Seções/socket
app.use(session({secret:'gJ3VvqEESyMdQR3EKG8VQrLn'}))
app.use(bodyParser.urlencoded({extended:true}))

// Aplicação web
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Socket/Mensageria
let messages = []

io.on('connection', socket => {
    console.log(`Socket conectado ${socket.id}`)
    socket.emit('previousMessages', messages)
    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

// Aplicação web
server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})

routes(app)

module.exports = app