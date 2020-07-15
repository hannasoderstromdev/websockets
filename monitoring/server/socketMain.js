const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/perfData', { useNewUrlParser: true, useUnifiedTopology: true })
const Machine = require('./models/Machine')

function socketMain(io, socket) {
    console.log('Someone called me. I\'m socketMain.', socket.id)
    
    let macA

    socket.on('clientAuth', key => {
        const NODE_SECRET = 'pokpokwpo4kt4r'
        const APP_SECRET = 'pokr4krkgngktg'
        
        if (key === NODE_SECRET) {
            socket.join('clients')
        } else if (key === APP_SECRET) {
            socket.join('ui')
            console.log('A React client has joined')
        } else {
            socket.disconnect(true)
        }
    })

    socket.on('initPerfData', async data => {
        macA = data.macA
        try {
            const response = await checkAndAdd(data)
            console.log(response)

        } catch(e) {
            console.error(e)
        }
    })

    socket.on('perfData', data => {
        console.log('tick...')
        io.to('ui').emit('data', data)
    })
}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne({ macA: data.macA }, (err, doc) => {
            if (err) {
                reject(err)
                throw err
            } else if (doc === null) {
                // doc does not exist
                const newMachine = new Machine(data)
                newMachine.save()
                resolve('added')
            } else {
                resolve('found')
            }
        })
    })
}

module.exports = socketMain