import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import StudentLayout from './layouts/StudentLayout'
import AdminLayout from './layouts/AdminLayout'
import Guide from './pages/Guide'
import Home from './pages/student/Home'
import SuccessStories from './pages/student/SuccessStories'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Manage from './pages/admin/Manage'
import { mockOffers } from './data/mockDatabase'

function App() {
  const [offers, setOffers] = useState(mockOffers)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/guide" replace />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Home offers={offers} />} />
          <Route path="success-stories" element={<SuccessStories />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard offers={offers} />} />
          <Route path="manage" element={<Manage offers={offers} setOffers={setOffers} />} />
        </Route>
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App