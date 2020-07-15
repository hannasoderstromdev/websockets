import React from 'react'
import moment from 'moment'

function Info({ macA, osType, upTime, cpuModel, cpuSpeed, numCores }) {
  return (
    <div className="widget-item info">
        <h3>Operating System</h3>
        <div>{osType}</div>
        <h3>Time Online</h3>
        <div>{moment.duration(upTime).humanize()}</div>
        <h3>Processor Information</h3>
        <div>Model: {cpuModel}</div>
        <div>Clock Speed: {cpuSpeed}MHz</div>
        <div>Cores: {numCores}</div>
    </div>
  )
}

export default Info