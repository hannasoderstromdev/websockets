function drawCircle(canvas, currentLoad, color = '#ccc') {
    if (canvas) {
        const OUTER_RADIUS = 95
        const INNER_RADIUS = 90
        const THICKNESS = 10

        const context = canvas.getContext('2d')

        context.clearRect(0, 0, 500, 500)
        context.fillStyle = color
        context.beginPath()
        context.arc(100, 100, INNER_RADIUS, Math.PI * 0, Math.PI * 2)
        context.closePath()
        context.fill()

        context.lineWidth = THICKNESS

        if (currentLoad < 20) {
            context.strokeStyle = '#00aa00'
        } else if (currentLoad < 40) {
            context.strokeStyle = '#eecc00'            
        } else if (currentLoad < 60) {
            context.strokeStyle = '#f0ad4e'    
        } else {
            context.strokeStyle = '#d9534f'  
        }

        context.beginPath()
        context.arc(100, 100, OUTER_RADIUS, Math.PI * 1.5, (Math.PI * 2 * currentLoad / 100) + Math.PI * 1.5)
        context.stroke()
    }

}

export default drawCircle