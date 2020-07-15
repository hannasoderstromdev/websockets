
const { getRandomColor } = require('../../utils')

class Orb {
    constructor(settings) {
        this.color = getRandomColor()
        this.locX = Math.floor(Math.random() * settings.WORLD_WIDTH)
        this.locY = Math.floor(Math.random() * settings.WORLD_HEIGHT)
        this.radius = 5
        
    }
}

module.exports = Orb