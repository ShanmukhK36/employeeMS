import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddSalary = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    })
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments()
                setDepartments(departments)
            }
            getDepartments()
        }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setSalary((previousData) => ({...previousData, [name] : value}))
    }

    const handleDepartment = async (e) => {
        e.preventDefault()
        try {
            const emps = await getEmployees(e.target.value) 
            setEmployees(emps)
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()    
        try {
            const response = await axios.post(`https://employee-ms-backend-silk.vercel.app/api/salary/add`, salary, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

  return (
    <>{departments ? 
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/*Department*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Department
                    </label>
                    <select 
                        name='department'
                        onChange={handleDepartment}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(department => (
                            <option key={department._id} value={department._id}>{department.department_name}</option>
                        ))}
                    </select>
                </div>

                {/*Employee*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Employee
                    </label>
                    <select 
                        name='employeeId'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee._id} value={employee._id}>{employee.employeeId}</option>
                        ))}
                    </select>
                </div>

                {/*Basic Salary*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Basic Salary
                    </label>
                    <input 
                        type='number'
                        name='basicSalary'
                        onChange={handleChange}
                        placeholder='Basic Salary'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    />
                </div>

                {/*Allowances*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Allowances
                    </label>
                    <input 
                        type='number'
                        name='allowances'
                        onChange={handleChange}
                        placeholder='Allowances'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    />
                </div>

                {/*Deductions*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Deductions
                    </label>
                    <input 
                        type='number'
                        name='deductions'
                        onChange={handleChange}
                        placeholder='Deductions'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    />
                </div>
                
                {/*Pay Date*/}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Pay Date
                    </label>
                    <input 
                        type='date'
                        name='payDate'
                        onChange={handleChange}
                        placeholder='Pay Date'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                    />
                </div>
            </div>
            <button
                type='submit'
                className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
            >
                Add Salary
            </button>
        </form>
    </div>
    : <div>Loading...</div>}</>
  )
}

export default AddSalary