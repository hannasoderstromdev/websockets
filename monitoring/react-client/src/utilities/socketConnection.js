import io from 'socket.io-client'
const APP_SECRET = 'pokr4krkgngktg'
const socket = io.connect('http://localhost:8181')
socket.emit('clientAuth', APP_SECRET)

export default socket