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
    <div className='bg-[#ffffff] '>
      <div className='w-full flex justify-around py-2 border-b border-slate-300'>
        <button className='bg-orange-500 text-black  w-30 rounded p-1 font-bold' onClick={handleLogs}>Logs</button>
        <button className='bg-orange-500 text-black w-30 rounded p-1 font-bold' onClick={handleActiveUsers}>Active Users</button>
      </div>
      {
        logs ? <Logs/> : <ActiveUsers/>
      }
      <div className='fixed bottom-0 flex justify-center w-full py-1'>
        <button className='bg-orange-500 text-black py-1 px-2 rounded font-bold' onClick={() => {setOpen(true)}}>delete logs</button>
      </div>
      {
        open && (<CofirmBox close={() => setOpen(false)} handleDelete={handleDelete}/>)
      }
    </div>
  )
}

export default App
