import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="w-full rounded-2xl bg-slate-900 p-6 text-white shadow-lg lg:w-72">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Administración</p>
            <h2 className="mt-2 text-xl font-semibold">Panel de prácticas</h2>
          </div>
          <nav className="space-y-2">
            <NavLink to="/admin/dashboard" className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/manage" className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              Gestionar ofertas
            </NavLink>
            <NavLink to="/admin/login" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">
              Cerrar sesión
            </NavLink>
          </nav>
        </aside>

        <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default AdminLayout
