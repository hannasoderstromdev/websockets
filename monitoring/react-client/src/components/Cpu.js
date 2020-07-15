import React from 'react'
import drawCircle from '../utilities/canvasLoadAnimation'

function Cpu({ cpuAverage, cpuLoad,  }) {
  const canvas = document.querySelector('canvas')
  drawCircle(canvas, cpuLoad, '#eee')
  return (
      <div className="widget-item cpu">
        <h3>CPU Load</h3>
        <div className="canvas-wrapper">
            <div className="widget-text">{cpuLoad}%</div>
            <canvas className="canvas"  width="200" height="200"></canvas>
        </div>
      </div>
  )
}

export default Cpu