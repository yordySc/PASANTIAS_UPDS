import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function AdminOnlyRoute() {
  const { loading, session, isAdmin } = useAuth()
  const location = useLocation()
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-600">Verificando acceso…</div>
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  if (!isAdmin) return <Navigate to="/admin/login" replace state={{ forbidden: true }} />
  return <Outlet />
}
