import { useNavigate } from "react-router-dom";

export const leavesColumns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Employee ID",
        selector: (row) => row.employeeId,
        width: "120px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px"
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "120px"
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "170px"
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px"
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    },
]

export const LeaveButtons = ({_id}) => {
    const navigate = useNavigate()

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`)
    }
    
    return (
        <button className="px-3 py-1 bg-teal-500 text-white hover:bg-teal-600" 
            onClick={() => handleView(_id)}
        >View</button>
    )
}