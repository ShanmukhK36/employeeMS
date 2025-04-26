import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([])
    const [departmentLoading, setDepartmentLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDeleteDepartment = () => {
      fetchDepartments()
    }

    const fetchDepartments = async () => {
      setDepartmentLoading(true)
      try {
          const response = await axios.get('http://localhost:5000/api/department', {
              headers: {
                  "Authorization" : `Bearer ${localStorage.getItem('token')}` 
              }
          })
          if(response.data.success) {
              let sno = 1;
              const data = response.data.departments.map((department) => (
                  {
                      _id: department._id,
                      sno: sno++,
                      department_name: department.department_name,
                      action: (<DepartmentButtons _id={department._id} onDeleteDepartment={onDeleteDepartment}/>)
                  }
              ))
              setDepartments(data)
              setFilteredDepartments(data)
          }
      } catch(error) {
          if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
      } finally {
          setDepartmentLoading(false)
      }
    };

    useEffect(() => {
      fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((department) =>
            department.department_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredDepartments(records)
    }
  return (
    <>{departmentLoading ? <div>Loading...</div> : 
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          onChange={filterDepartments}
          className="px-4 py-0.5 border bg-white"
        ></input>
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>
    }</>
  );
};

export default DepartmentList;
