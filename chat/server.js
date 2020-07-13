const express = require('express')
const app = express()
const socketIo = require('socket.io')

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(8000)

const ioServer = socketIo(expressServer)

ioServer.of('/').on('connection', socket => {
    console.log('Connection to /')

    socket.emit('messageFromServer', { data: 'Welcome to the socketio server!', path: '/' })
    socket.on('newMessageToServer', msg => {
        // console.log(msg)
        socket.emit('messageToClients', { text: msg.text })
    })
    socket.join('level1')
    socket.to('level1').emit('joined', `${socket.id} joined level 1 room`)
})

ioServer.of('/admin').on('connect', socket => {
    console.log('Connection to /admin')
    socket.emit('messageFromServer', { data: 'Welcome to the admin-channel', path: '/admin' })
})