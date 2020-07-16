import React from 'react'
import drawCircle from '../utilities/canvasLoadAnimation'

function Mem({ freeMem, totalMem, usedMemPercentage, memId }) {
    const canvas = document.querySelector(`.${memId}`)

    drawCircle(canvas, usedMemPercentage * 100, '#eee')
    const totalMemMb = Math.floor(totalMem / 10737418 * 100) / 100
    const freeMemMb = Math.floor(freeMem / 10737418 * 100) / 100
    return (
        <div className="widget-item mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <div className="widget-text">{usedMemPercentage * 100}%</div>
                <canvas className={memId} width="200" height="200"></canvas>
            </div>
            <div className="">Memory Total: {totalMemMb} Mb</div>
            <div className="">Memory Available: {freeMemMb} Mb</div>
        </div>
    )
}

export default Mem