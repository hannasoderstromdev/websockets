import React from 'react'

import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'

import './widget.css'

function Widget({ data: { 
    macA,
    numCores,
    cpuAverage, 
    cpuLoad,
    cpuModel,
    cpuSpeed,
    freeMem,
    totalMem,
    usedMemPercentage,
    osType,
    upTime,
    online,
} }) {
    let cpuId = `cpu-id-${macA.split(':').join('')}`
    let memId = `mem-id-${macA.split(':').join('')}`
    const cpu = { cpuAverage, cpuLoad, cpuId }
    const mem = { freeMem, totalMem, usedMemPercentage, memId }
    const info = { macA, osType, upTime, cpuModel, cpuSpeed, numCores }

    const status = online ? <div className="status status-online">Online</div> : <div className="status status-offline">Offline</div>
  return (
      <div className="widget">
        {status}
        <Cpu {...cpu} />
        <Mem {...mem}/>
        <Info {...info} />
      </div>
  )
}

export default Widget