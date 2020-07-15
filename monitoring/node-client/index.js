const os = require('os')

const cpus = os.cpus()

async function getPerformanceData() {
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
 
    return { osType, upTime, freeMem, totalMem, usedMemPercentage, cpuModel, cpuSpeed, numCores, cpuAverage, cpuLoad }
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


getPerformanceData().then(data => console.log(data))
