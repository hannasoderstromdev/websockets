// Main socket stuff
const { io } = require('../server')
const { checkForOrbCollisions, checkForPlayerCollisions } = require('./collisionHandling')

const Orb = require('./classes/Orb')
const PlayerConfig = require('./classes/PlayerConfig')
const PlayerData = require('./classes/PlayerData')
const Player = require('./classes/Player')

const orbs = []
const players = []
const settings = {
  DEFAULT_ORBS: 500,
  DEFAULT_SPEED: 6,
  DEFAULT_SIZE: 6,
  DEFAULT_ZOOM: 1.5,
  WORLD_WIDTH: 500,
  WORLD_HEIGHT: 500,
}

initGame()

setInterval(() => {
    if (players.length > 0) {
        io.to('game').emit('tock', {
            players,
        })
    }
}, 33) // 30 fps

let player = {}

io.sockets.on('connect', socket => {
  
    socket.on('init', data => {
        socket.join('game')

        const playerConfig = new PlayerConfig(settings)
        const playerData = new PlayerData(data.playerName, settings)
        
        player = new Player(socket.id, playerConfig, playerData)

        setInterval(() => {
            socket.emit('tickTock', {
                playerX: player.playerData.locX,
                playerY: player.playerData.locY,
            })
        }, 33) // 30 fps

        socket.emit('initReturn', { orbs })
        players.push(playerData)
    })

    socket.on('tick', data => {
        speed = player.playerConfig.speed
        
        xV = player.playerConfig.xVector = data.xVector
        yV = player.playerConfig.yVector = data.yVector
        
        if ((player.playerData.locX < 5 && player.playerConfig.xVector < 0) || (player.playerData.locX > settings.WORLD_WIDTH) && (xV > 0)) {
            player.playerData.locY -= speed * yV
        } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > settings.WORLD_HEIGHT) && (yV < 0)) {
            player.playerData.locX += speed * xV
        } else {
            player.playerData.locX += speed * xV
            player.playerData.locY -= speed * yV
        }

        const capturedOrb = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)
        capturedOrb.then(data => {
            const orbData = {
                orbIndex: data,
                newOrb: orbs[data]
            }

            io.sockets.emit('updateLeaderBoard', getLeaderBoard())
            io.sockets.emit('orbSwitch', orbData)
        }).catch(() => {
            // No collision
        })

        const playerDeath = checkForPlayerCollisions(player.playerData, player.playerConfig, players, player.socketId)
        playerDeath.then(data => {
            console.log('Player death')
            io.sockets.emit('updateLeaderBoard', getLeaderBoard())
        }).catch(() => {

        })
    })
})

function initGame() {
    // Generate 500 Orbs
    for (let i = 0; i < settings.DEFAULT_ORBS; i++) {
        orbs.push(new Orb(settings))
    }
}

function getLeaderBoard() {
    players.sort((a, b) => b.score - a.score)
    return players.map(player => ({
       name: player.name,
       score: player.score,
    }))
}

module.exports = io