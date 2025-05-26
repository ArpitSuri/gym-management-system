
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminLayout from './AdminDashboard/AdminLayout'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Dashboard from './AdminDashboard/Dashboard'
import RegisterMember from './pages/RegisterMember'
import MembersList from './AdminDashboard/component/MemberList'
import PlansManager from './AdminDashboard/PlansManager'
import Attendance from './AdminDashboard/Attendance'
import AttendanceForm from './pages/AttendanceForm'
import HomeWebsite from './pages/HomeWebsite'

function App() {

  return (
    <>
      <ToastContainer position="top-right" />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWebsite/>} />
      <Route path="/login" element={<Login />} />
      <Route path="mark-attendance" element={<AttendanceForm />} />
      <Route path ="register" element={<RegisterMember />} />

          <Route path="adminDashboard" element={<ProtectedRoute allowedRole="admin"> <AdminLayout /> </ProtectedRoute>}>

            <Route index element={<Dashboard />} />
            <Route path="members" element={<MembersList />} />
            <Route path="register" element={<RegisterMember />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="plans" element={<PlansManager />} />
            
          </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
