import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Loader from './Loader';
const Logs = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(100);
    const [logs, setLogs] = useState([]);
    const [logsCount, setLogsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const handleLogs = async () => {
        try {
            setLoading(true);
            console.log(page + "page inside")
            const response = await axios.get('https://database-9qqy.onrender.com/getLogs', { params: { page, limit, search } });
            if (response.data.success) {
                setLogs(response.data.logs);
                setLogsCount(response.data.count);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            handleLogs();
        }, 200);

        return () => clearTimeout(delay);
    }, [page, search])
    return (
        <>
            <div className='flex justify-evenly mt-5 text-slate-200'>
                <button className='border border-[#222528] rounded w-25 text-sm font-bold' onClick={() => setPage((prev) => Math.max(1, prev - 1))} >previous</button>
                <p className='border border-[#222528] rounded w-fit px-4 text-sm font-bold'>page: {page}</p>
                <p className='border border-[#222528] rounded w-fit px-4 text-sm font-bold'>count: {logsCount}</p>
                <button className='border border-[#222528] rounded w-25 text-sm font-bold' onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(logsCount / limit)))}>next</button>
            </div>
            <div className='flex justify-center items-center my-4'>
                <input type="text" className=' bg-black border border-[#222528] rounded-md  outline-none text-slate-200 p-2' onChange={(e) => setSearch(e.target.value)} />
            </div>
            {
                loading ? (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <Loader />
                    </div>
                )
                    : (
                        <table className="table-auto border-collapse border border-[#222528] w-full text-sm">
                            <thead>
                                <tr className="bg-blue-600 text-black font-bold">
                                    <th className="border  px-2 py-1">S.No</th>
                                    <th className="border  px-2 py-1">Number</th>
                                    <th className="border  px-2 py-1">Time</th>
                                    <th className="border  px-2 py-1">Response</th>
                                    <th className="border  px-2 py-1">Server</th>
                                </tr>
                            </thead>

                            <tbody>
                                {logs.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className={
                                            user.status === 500
                                                ? "bg-red-700/20 text-slate-200"
                                                : user.status === 300
                                                    ? "bg-green-950 text-slate-200"
                                                    : "bg-[#0a0a0a] text-slate-200"
                                        }
                                    >
                                        <td className="border border-[#222528] px-2 py-1 ">{index + 1}</td>
                                        <td className="border border-[#222528] px-2 py-1 ">{user.number}</td>
                                        <td className="border border-[#222528] px-2 py-1 ">{user.time}</td>
                                        <td className={`border border-[#222528] px-2 py-1 ${user.response < 8 && "bg-green-300"} `}>{user.response}</td>
                                        <td className="border border-[#222528] px-2 py-1 ">{user.server}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            }


        </>
    )
}

export default Logs
