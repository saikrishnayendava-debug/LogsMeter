import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Loader from './Loader';
const ActiveUsers = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(50);
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const handleActiveUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://logs-uhwy.onrender.com/totalUsers', { params: { page, limit, search } });
            if (response.data.success) {
                setActiveUsers(response.data.totalUsers);
                setActiveUsersCount(response.data.count);
            }
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error fetching active users',
                error: error.message,
            });
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            handleActiveUsers();
        }, 200);

        return () => clearTimeout(delay);
    }, [page, search])
    return (
        <>
            <div className='flex justify-evenly mt-5'>
                <button className='border border-slate-300 rounded w-25 text-sm font-bold' onClick={() => setPage((prev) => Math.max(1, prev - 1))} >previous</button>
                <p className='border border-slate-300 rounded w-fit px-4 text-sm font-bold'>page: {page}</p>

                <p className='border border-slate-300 rounded w-25 text-sm font-bold'>count {activeUsersCount}</p>
                <button className='border border-slate-300 rounded w-25 text-sm font-bold' onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(activeUsersCount / limit)))}>next</button>


            </div>
            <div className='flex justify-center items-center my-4'>
                <input type="text" className='w-40 bg-blue-100 rounded-md border-none outline-orange-500 text-black' onChange={(e) => setSearch(e.target.value)}/>
            </div>
                
            {
                loading ? (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <Loader />
                    </div>
                ) : (
                    <table className="table-auto border-collapse border border-orange-300 w-full text-sm mt-5">
                        <thead>
                            <tr className="bg-orange-100">
                                <th className="border border-orange-300 px-2 py-1">S.No</th>
                                <th className="border border-orange-300 px-2 py-1">Number</th>
                                <th className="border border-orange-300 px-2 py-1">Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {activeUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border border-orange-300 px-2 py-1">{index + 1}</td>
                                    <td className="border border-orange-300 px-2 py-1">{user.number}</td>
                                    <td className="border border-orange-300 px-2 py-1">{user.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

        </>
    )
}

export default ActiveUsers
