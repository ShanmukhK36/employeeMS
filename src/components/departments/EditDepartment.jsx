import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://employee-ms-backend-silk.vercel.app/api/department/${id}`, 
                    {
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                if(response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch(error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setLoading(false)
            }
        };
        fetchDepartments();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://employee-ms-backend-silk.vercel.app/api/department/${id}`, department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
  return (
    <>{loading ? <div>Loading...</div> : 
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="department_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="department_name"
            onChange={handleChange}
            value={department.department_name}
            placeholder="Enter Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea 
            name="description" 
            onChange={handleChange}
            value={department.description}
            placeholder="Description" 
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
        />
        </div>
        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Edit Department</button>
      </form>
    </div>
    }</>
  )
}

export default EditDepartment