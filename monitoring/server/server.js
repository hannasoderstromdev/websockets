const express = require('express')
const cluster = require('cluster')
const net = require('net')
const socketIo = require('socket.io')
const ioRedis = require('socket.io-redis')
const farmhash = require('farmhash')

const socketMain = require('./socketMain')

const PORT = 8181
const NUM_PROCESSES = require('os').cpus().length

const REDIS_PORT = 6379 // Redis default port
const ENV = 'localhost'

if (cluster.isMaster) {
    const workers = []

    const spawn = function(i) {
        workers[i] = cluster.fork()

        workers[i].on('exit', function(code, signal){
            spawn(i)
        })
    }

    for (let i = 0; i < NUM_PROCESSES; i++) {
        spawn(i)
    }

    const generateWorkerIndexFromIP = function(ip, len) {
        return farmhash.fingerprint32(ip) % len
    }

    const server = net.createServer({ pauseOnConnect: true }, connection => {
        const WORKER_INDEX = generateWorkerIndexFromIP(connection.remoteAddress, NUM_PROCESSES)
        const worker = workers[WORKER_INDEX]
        worker.send('sticky-session:connection', connection)
    })

    server.listen(PORT)
    console.log(`Master: Worker listening on port ${PORT}`)

} else {
    const app = express()
    const server = app.listen(0, ENV)
    console.log(`Slave: Worker listening on port ${PORT}`)

    const io = socketIo(server)

    io.adapter(ioRedis({ host: ENV, port: REDIS_PORT }))

    io.on('connection', socket => {
        socketMain(io, socket)
        console.log(`Connected to worker: ${cluster.worker.id}`)
    })

    process.on('message', (message, connection) => {
        if (message !== 'sticky-session:connection') {
            return 
        }

        server.emit('connection', connection)

        connection.resume()
    })
}