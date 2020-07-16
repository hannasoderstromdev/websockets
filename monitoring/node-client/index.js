const os = require('os')
const io = require('socket.io-client')

const socket = io('http://127.0.0.1:8181')

socket.on('connect', () => {
    console.log('Connected to socket server.')
    const nI = os.networkInterfaces()
    let macA
    
    for (let key in nI) {
      const { internal, mac } = nI[key][0]
      if (!internal) {
        macA = mac
        break
      }
    }

    const NODE_SECRET = 'pokpokwpo4kt4r'
    socket.emit('clientAuth', NODE_SECRET)


    getPerformanceData().then(data => {
        data.macA = macA  // Add property
        socket.emit('initPerfData', data)
    })
   
    let perfDataInterval = setInterval(() => {
        getPerformanceData().then(data => {
            data.macA = macA  // Add property
            socket.emit('perfData', data)
        })
    }, 1000)

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval)
    })

})

async function getPerformanceData() {
    const cpus = os.cpus()
    const osType = os.type() === 'Darwin' ? 'MacOS' : os.type()
    const upTime = os.uptime()
    const freeMem = os.freemem()
    const totalMem = os.totalmem()
    const usedMem = totalMem - freeMem
    const usedMemPercentage = Math.floor(usedMem / totalMem * 100) / 100
    const { model: cpuModel, speed: cpuSpeed } = cpus[0]
    const numCores = cpus.length
    const cpuAverage = calcCpuAverage()
    const cpuLoad = await getCpuLoad()
    const online = true
    return { osType, upTime, freeMem, totalMem, usedMemPercentage, cpuModel, cpuSpeed, numCores, cpuAverage, cpuLoad, online }
}


function calcCpuAverage() {
    const cpus = os.cpus() // redefine to get new value

    let idleMs = 0
    let totalMs = 0
    cpus.forEach(core => {
      for (type in core.times) {
        totalMs += core.times[type]
      }
      idleMs += core.times.idle
    })
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length,
    }
}

function getCpuLoad() {
    return new Promise((resolve, reject) => {

        const start = calcCpuAverage()
        
        setTimeout(() => {
            const end = calcCpuAverage()
            const idleDifference = end.idle - start.idle
            const totalDifference = end.total - start.total
            
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference)
            resolve(percentageCpu)
        }, 100)
    })
}


