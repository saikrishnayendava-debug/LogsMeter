import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import Logs from './Components/Logs';
import ActiveUsers from './Components/ActiveUsers';


function App() {
  
  const [logs, setLogs] = useState(true);
  const [activeUsers, setActiveUsers] = useState(false);
  const handleLogs = () => {
    setLogs(true);
    setActiveUsers(false);
  }
  const handleActiveUsers = () => {
    setActiveUsers(true);
    setLogs(false);
  }
  
  
  return (
    <div className='bg-[#ffffff] '>
      <div className='w-full flex justify-around py-2 border-b border-slate-300'>
        <button className='bg-orange-500 text-black  w-30 rounded p-1 font-bold' onClick={handleLogs}>Logs</button>
        <button className='bg-orange-500 text-black w-30 rounded p-1 font-bold' onClick={handleActiveUsers}>Active Users</button>
      </div>
      {
        logs ? <Logs/> : <ActiveUsers/>
      }
    </div>
  )
}

export default App
