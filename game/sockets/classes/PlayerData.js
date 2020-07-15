const { getRandomColor } = require('../../utils')

class PlayerData {
    constructor(playerName, settings) {
        this.name = playerName
        this.locX = Math.floor(settings.WORLD_WIDTH * Math.random() + 10)
        this.locY = Math.floor(settings.WORLD_HEIGHT * Math.random() + 10)
        this.radius = settings.DEFAULT_SIZE
        this.color = getRandomColor()
        this.score = 0
        this.orbsAbsorbed = 0
    }
}

module.exports = PlayerData