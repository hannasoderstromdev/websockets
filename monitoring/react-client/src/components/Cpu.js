import React from 'react'
import drawCircle from '../utilities/canvasLoadAnimation'

function Cpu({ cpuAverage, cpuLoad, cpuId }) {
  const canvas = document.querySelector(`.${cpuId}`)
  drawCircle(canvas, cpuLoad, '#eee')
  return (
      <div className="widget-item cpu">
        <h3>CPU Load</h3>
        <div className="canvas-wrapper">
            <div className="widget-text">{cpuLoad}%</div>
            <canvas className={cpuId}  width="200" height="200"></canvas>
        </div>
      </div>
  )
}

export default Cpu