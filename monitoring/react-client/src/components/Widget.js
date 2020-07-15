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
} }) {
    const cpu = { cpuAverage, cpuLoad }
    const mem = { freeMem, totalMem, totalMem, usedMemPercentage }
    const info = { macA, osType, upTime, cpuModel, cpuSpeed, numCores, }
  return (
      <div className="widget">
        <Cpu {...cpu} />
        <Mem {...mem}/>
        <Info {...info} />
      </div>
  )
}

export default Widget