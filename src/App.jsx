import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import { Navigate } from 'react-router-dom'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EditDepartment from './components/departments/EditDepartment'
import AddEmployee from './components/employee/AddEmployee'
import EmployeeList from './components/employee/EmployeeList'
import { useEffect } from 'react'
import ViewEmployee from './components/employee/ViewEmployee'
import EditEmployee from './components/employee/EditEmployee'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'
import Summary from './components/employeeDashboard/Summary'
import LeaveList from './components/leave/LeaveList'
import AddLeave from './components/leave/AddLeave'
import Setting from './components/employeeDashboard/Setting'
import LeavesList from './components/leave/LeavesList'
import LeaveDetail from './components/leave/LeaveDetail'

function App() {

  useEffect(() => {

  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Navigate to = "/admin-dashboard"/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/admin-dashboard' element = {
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard/>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
            <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}></Route>
            <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}></Route>

            <Route path='/admin-dashboard/employees' element={<EmployeeList/>}></Route>
            <Route path='/admin-dashboard/add-employee' element={<AddEmployee/>}></Route>
            <Route path='/admin-dashboard/employee/:id' element={<ViewEmployee/>}></Route>
            <Route path='/admin-dashboard/employee/edit/:id' element={<EditEmployee/>}></Route>

            <Route path='/admin-dashboard/employee/salary/:id' element={<ViewSalary/>}></Route>
            <Route path='/admin-dashboard/salary/add' element={<AddSalary/>}></Route>

            <Route path='/admin-dashboard/setting' element={<Setting/>}></Route>

            <Route path='/admin-dashboard/leaves' element={<LeavesList/>}></Route>
            <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetail/>}></Route>
            <Route path='/admin-dashboard/employee/leave/:id' element={<LeaveList/>}></Route>
          </Route>
          <Route path='/employee-dashboard' element = {
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin","employee"]}>
                <EmployeeDashboard/>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<Summary/>}></Route>
            <Route path='/employee-dashboard/profile/:id' element={<ViewEmployee/>}></Route>
            <Route path='/employee-dashboard/leaves/:id' element={<LeaveList/>}></Route>
            <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>
            <Route path='/employee-dashboard/salary/:id' element={<ViewSalary/>}></Route>
            <Route path='/employee-dashboard/setting' element={<Setting/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
