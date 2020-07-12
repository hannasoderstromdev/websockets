const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer((req, res) => {
    res.end('Connected. Listening on port 8000...')
})

const io = socketIo(server)

io.on('connection', (socket, req) => {
    socket.emit('Server: Welcome to the socket.io server!')
    socket.on('event', (msg) => {
        console.log(msg)
    })
})

server.listen(8000)