import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; 
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [employeeLoading, setEmployeeLoading] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmployeeLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                    }
                })
                if(response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((employee) => (
                        {
                            _id: employee._id,
                            sno: sno++,
                            profileImage: <img width={40} className="rounded-full" src={`http://localhost:5000/${employee.userId.profileImage}`}/>,
                            name: employee.userId.name,
                            dob: new Date(employee.dob).toLocaleDateString(),
                            department_name: employee.department.department_name,
                            action: (<EmployeeButtons _id={employee._id} />)
                        }
                    ))
                    setEmployees(data)
                    setFilteredEmployees(data)
                }
            } catch(error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmployeeLoading(false)
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
      const records = employees.filter((employee) => (
        employee.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setFilteredEmployees(records)
    }

  return (
    <>{employeeLoading ? <div>Loading...</div> : 
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Employee Name"
          onChange={handleFilter}
          className="px-4 py-0.5 border bg-white"
        ></input>
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={filteredEmployees} pagination/>
      </div>
    </div>
    }</>
  );
};

export default EmployeeList;