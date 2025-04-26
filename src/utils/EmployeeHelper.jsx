import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        if(response.data.success) {
            departments = response.data.departments
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments
};

// employees for salary form
export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        if(response.data.success) {
            employees = response.data.employees
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees
};

export const EmployeeButtons = ({_id}) => {
    const navigate = useNavigate()
    
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white hover:bg-teal-500" 
                onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >View</button>
            <button className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-white hover:bg-yellow-500"
                onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
            >Salary</button>
            <button className="px-3 py-1 bg-red-600 text-white hover:bg-red-500"
                onClick={() => navigate(`/admin-dashboard/employee/leave/${_id}`)}
            >Leave</button>
        </div>
    )
}

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Department",
        selector: (row) => row.department_name,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },
]