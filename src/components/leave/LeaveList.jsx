import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
    const {user} = useAuth()
    const {id} = useParams()
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    let sno = 1;

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`https://employee-ms-backend-silk.vercel.app/api/leave/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if(response.data.success) {
                setLeaves(response.data.leaves)
                setFilteredLeaves(response.data.leaves)
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterLeaves = (q) => {
        const filteredRecords = leaves.filter((leave) =>
            leave.leaveType.toLocaleLowerCase().includes(q.target.value.toLocaleLowerCase())
        );
        setFilteredLeaves(filteredRecords);
    };

  return (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input
                type='text'
                placeholder='Search By Leave Type'
                className='px-4 py-0.5 border bg-white'
                onChange={filterLeaves}
            />
            {user.role === 'employee' ? 
                (<Link 
                    to='/employee-dashboard/add-leave'
                    className='px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-500'
                >
                    Add Leave
                </Link>) :
                ""
            }       
        </div>
        <table className='w-full text-sm text-left text-gray-500 mt-2'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr>
                    <th className='px-6 py-3'>SNO</th>
                    <th className='px-6 py-3'>Leave Type</th>
                    <th className='px-6 py-3'>From</th>
                    <th className='px-6 py-3'>To</th>
                    <th className='px-6 py-3'>Reason</th>
                    <th className='px-6 py-3'>Applied Date</th>
                    <th className='px-6 py-3'>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredLeaves.map((leave) => (
                    <tr
                        key={leave._id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    >
                        <td className='px-6 py-3'>{sno++}</td>
                        <td className='px-6 py-3'>{leave.leaveType}</td>
                        <td className='px-6 py-3'>
                            {new Date(leave.startDate).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-3'>
                            {new Date(leave.endDate).toLocaleDateString()}  
                        </td>
                        <td className='px-6 py-3'>{leave.reason}</td>
                        <td className='px-6 py-3'>
                            {new Date(leave.appliedAt).toLocaleDateString()}  
                        </td>
                        <td className='px-6 py-3'>{leave.status}</td>
                    </tr>
                ))}
            </tbody>
        </table> 
    </div>
  )
}

export default LeaveList