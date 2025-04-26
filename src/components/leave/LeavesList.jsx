import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LeaveButtons, leavesColumns } from '../../utils/LeavesHelper'
import DataTable from 'react-data-table-component'

const LeavesList = () => {
    const [leaves, setLeaves] = useState([])
    const [leavesLoading, setLeavesLoading] = useState(false)
    const [filteredLeaves, setFilteredLeaves] = useState([])

    const fetchLeaves = async () => {
        setLeavesLoading(true)
        try {
            const response = await axios.get('https://employee-ms-backend-silk.vercel.app/api/leave', {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                }
            })
            if(response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.department_name,
                        days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate() + 1,
                        status: leave.status,
                        action: (<LeaveButtons _id={leave._id} />)
                    }
                ))
                setLeaves(data)
                setFilteredLeaves(data)
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setLeavesLoading(false)
        }
    } 

    useEffect(() => {
        fetchLeaves()
    }, []);

    const filterLeavesList = (e) => {
      const records = leaves.filter((leave) => (
        leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setFilteredLeaves(records)
    }

    const filterByStatus = (status) => {
        const records = leaves.filter((leave) => (
            leave.status.toLowerCase().includes(status.toLowerCase())
          ))
          setFilteredLeaves(records)
    }

  return (
    <>{leavesLoading ? <div>Loading...</div> :
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center mt-2 mb-2'>
            <input
                type='text'
                placeholder='Search By Emp ID'
                className='px-4 py-0.5 border bg-white'
                onChange={filterLeavesList}
            />
            <div className='flex space-x-3'>
                <button 
                    className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                    onClick={() => filterByStatus("Pending")}
                >
                    Pending
                </button>
                <button 
                    className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                    onClick={() => filterByStatus("Approved")}
                >
                    Approved
                </button>
                <button 
                    className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                    onClick={() => filterByStatus("Rejected")}
                >
                    Rejected
                </button>
            </div>
        </div>
        <DataTable columns={leavesColumns} data={filteredLeaves} pagination/>
    </div>
    }</>
  )
}

export default LeavesList