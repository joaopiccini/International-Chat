const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

app.use(session({secret:'gJ3VvqEESyMdQR3EKG8VQrLn'}))
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

var login = "admin";
var password = "123";

app.post('/', (req, res) =>{
    if(req.body.login == login && req.body.password == password){
        req.session.login = login;
        res.render('chat')
        console.log('Usuário logado:' + req.session.login)
    }
    else{
        res.render('login')
    }
})

app.get('/', (req, res) =>{
    if(req.session.email){
        res.render('chat')
        console.log('Usuário logado: ' + req.session.email)
    }
    else{
        res.render('login')
    }
})

let messages = []

io.on('connection', socket => {
    console.log(`Socket conectado ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})