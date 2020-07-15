const express = require('express')
const socketIo = require('socket.io')
const helmet = require('helmet')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(helmet())

const expressServer = app.listen(8080)
const io = socketIo(expressServer)

console.log('Express and socket.io listening at port 8080')

module.exports = {
    app,
    io,
}