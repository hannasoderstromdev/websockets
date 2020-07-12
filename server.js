const http = require('http')
const websocket = require('ws')
const { WSAEWOULDBLOCK } = require('constants')


const server = http.createServer((req, res) => {
    res.end('Connected. Listening on port 8000...')
})

const wss = new websocket.Server({ server })

wss.on('headers', (headers, req) => {
    console.log(headers)
})

wss.on('connection', (ws, req) => {
    ws.send('Server: Welcome to the websocket server!')
    ws.on('message', (msg) => {
        console.log(msg)
    })
})

server.listen(8000)