const botaoSair = document.querySelector('.botao-sair')
var socket = io('http://localhost:3000')

function renderMessage(message){
    $('.messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>')
}

socket.on('previousMessages', function(messages) {
    for(message of messages) {
        renderMessage(message)
    }
})

socket.on('receivedMessage', function(message) {
    renderMessage(message)
})

$('#chat').submit(function(event) {
    event.preventDefault()

    var author = 'joao'
    var message = $('input[name=message]').val()

    if(author.length && message.length){
        var messageObject = {
            author: author,
            message: message
        }

        renderMessage(messageObject)

        socket.emit('sendMessage', messageObject)
    }
})

botaoSair.addEventListener('click', function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/logout",
        dataType: "json"
    })
})
