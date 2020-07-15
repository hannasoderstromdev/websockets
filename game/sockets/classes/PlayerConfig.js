class PlayerConfig {
    constructor(settings) {
        this.xVector = 0
        this.yVector = 0
        this.speed = settings.DEFAULT_SPEED
        this.zoom = settings.DEFAULT_ZOOM
    }
}

module.exports = PlayerConfig