function draw() {
  // Reset
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Center camera on player
  const cameraX = -player.locX + canvas.width / 2
  const cameraY = -player.locY + canvas.height / 2
  context.translate(cameraX, cameraY)

  // Draw player
  context.beginPath()
  context.fillStyle = 'rgb(255, 0, 0)'
  
  const RADIUS = 10
  const RADIAN_START = 0
  const RADIAN_END = Math.PI * 2

  context.arc(player.locX, player.locY, RADIUS, RADIAN_START, RADIAN_END)
  context.fill()
  context.lineWidth = 3
  context.strokeStyle = 'rgb(0, 255, 0)'
  context.stroke()

  // Generate orbs
  orbs.forEach(orb => {
      context.beginPath()
      context.fillStyle = orb.color
      context.arc(orb.locX, orb.locY, orb.radius, RADIAN_START, RADIAN_END)
      context.fill()
  })
  
  requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', e => {
    
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    
    if (angleDeg >= 0 && angleDeg < 90){
        // console.log("Mouse is in the lower right quad")
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    } else if (angleDeg >= 90 && angleDeg <= 180){
        // console.log("Mouse is in the lower left quad")
        xVector = -(angleDeg - 90)/90;
        yVector = -(1 - ((angleDeg - 90)/90));
    } else if (angleDeg >= -180 && angleDeg < -90){
        // console.log("Mouse is in the upper left quad")
        xVector = (angleDeg + 90)/90;
        yVector = (1 + ((angleDeg + 90)/90));
    } else if (angleDeg < 0 && angleDeg >= -90){
        // console.log("Mouse is in the upper right quad")
        xVector = (angleDeg + 90)/90;
        yVector = (1 - ((angleDeg + 90)/90));
    }

    player.xVector = xVector;
    player.yVector = yVector;
})