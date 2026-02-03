import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import Logs from './Components/Logs';
import ActiveUsers from './Components/ActiveUsers';
import CofirmBox from './Components/CofirmBox';


function App() {
  
  const [logs, setLogs] = useState(true);
  const [activeUsers, setActiveUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLogs = () => {
    setLogs(true);
    setActiveUsers(false);
  }
  const handleActiveUsers = () => {
    setActiveUsers(true);
    setLogs(false);
  }
  const handleDelete = async () => {
    try {
      setOpen(true);
      setLoading(true);
      const response = await axios.delete('https://database-9qqy.onrender.com/delete');
      if (response.data.success) {
        alert('Logs deleted successfully');
      }
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setOpen(false);
    }
  }
  
  return (
    <div className='bg-black text-slate-200 h-screen text-sm font-extrabold'>
      <div className='w-full flex justify-around py-2 border-b border-[#222528]'>
        <button className='bg-[#03ff81] text-black  w-30 rounded-2xl py-3 ' onClick={handleLogs}>Logs</button>
        <button className='bg-[#03ff81] text-black w-30 rounded-2xl py-3' onClick={handleActiveUsers}>Active Users</button>
      </div>
      {
        logs ? <Logs/> : <ActiveUsers/>
      }
      <div className='fixed bottom-0 flex justify-center w-full py-1'>
        <button className='bg-slate-800 text-white py-3 px-6 rounded-2xl ' onClick={() => {setOpen(true)}}>delete logs</button>
      </div>
      {
        open && (<CofirmBox close={() => setOpen(false)} handleDelete={handleDelete}/>)
      }
    </div>
  )
}

export default App
