import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import StudentLayout from './layouts/StudentLayout'
import AdminLayout from './layouts/AdminLayout'
import Guide from './pages/Guide'
import Home from './pages/student/Home'
import SuccessStories from './pages/student/SuccessStories'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Manage from './pages/admin/Manage'
import AdminOnlyRoute from './auth/AdminOnlyRoute'
import { getOffers, getSuccessStories } from './services/internships'
import type { CompanyOffer, SuccessStory } from './types'

function App() {
  const [offers, setOffers] = useState<CompanyOffer[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])

  const refreshOffers = async () => {
    try {
      const nextOffers = await getOffers()
      setOffers(nextOffers)
    } catch (error) {
      console.error('No se pudieron cargar las ofertas.', error)
      setOffers([])
    }
  }

  const refreshSuccessStories = async () => {
    try {
      const nextStories = await getSuccessStories()
      setSuccessStories(nextStories)
    } catch (error) {
      console.error('No se pudieron cargar los casos de éxito.', error)
      setSuccessStories([])
    }
  }

  useEffect(() => {
    void refreshOffers()
    void refreshSuccessStories()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/guide" replace />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Home offers={offers} />} />
          <Route path="success-stories" element={<SuccessStories stories={successStories} />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AdminOnlyRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard offers={offers} />} />
            <Route path="manage" element={<Manage offers={offers} setOffers={setOffers} refreshOffers={refreshOffers} />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
