const express = require('express')
const socketIo = require('socket.io')
const namespaces = require('./data/namespaces')

const app = express()
app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(8000)

const ioServer = socketIo(expressServer)


ioServer.on('connect', socket => {
   const nsData = namespaces.map(ns => ({ img: ns.img, endpoint: ns.endpoint }))
   socket.emit('nsList', nsData)
})

namespaces.forEach(ns => {
    ioServer.of(ns.endpoint).on('connect', socket => {
        const username = socket.handshake.query.username
        
        console.log(`${username} has joined ${ns.endpoint}`)
        
        socket.emit('nsRoomLoad', ns.rooms)

        socket.on('joinRoom', roomToJoin => {
            const roomToLeave = Object.keys(socket.rooms)[1]
            socket.leave(roomToLeave)
            updateUsersInRoom(ns, roomToJoin)

            const nsRoom = ns.rooms.find(item => item.roomTitle === roomToJoin)
            socket.join(roomToJoin)
            socket.emit('historyCatchUp', nsRoom.history)
            updateUsersInRoom(ns, roomToJoin)
        })

        socket.on('newMessageToServer', msg => {
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username,
                avatar: 'https://via.placeholder.com/30',
            }
            const roomTitle = Object.keys(socket.rooms)[1]
            const nsRoom = ns.rooms.find(item => item.roomTitle === roomTitle)
            nsRoom.addMessage(fullMsg)
            
            ioServer.of(ns.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
        })
    })
})

function updateUsersInRoom(ns, room) {
    ioServer.of(ns.endpoint).in(room).clients((err, clients) => {
        console.log(`User count: ${clients.length}`)
        ioServer.of(ns.endpoint).in(room).emit('updateUserCount', clients.length)
    })
}