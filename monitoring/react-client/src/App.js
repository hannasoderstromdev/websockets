import React, { useState, useEffect } from 'react';

import socket from './utilities/socketConnection'

import Widget from './components/Widget'

import './app.css'

function App() {
  const [performanceData, setPerformanceData] = useState({})
  
  useEffect(() => {
    socket.on('data', data => setPerformanceData(state => {
      return { ...state, [data.macA]: data }
    }))
  }, [])

  const widgets = []

  Object.entries(performanceData).forEach(([macA, data]) => {
    widgets.push(<Widget key={macA} data={data} />)
  })

  return (
    <div className="app">
      {widgets}
    </div>
  );
}

export default App;
