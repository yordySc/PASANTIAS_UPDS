import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import logoUPDS from '../assets/logo-upds.png'

function StudentLayout() {
  // Estado para controlar el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      
      {/* Header / Menú Superior */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo y Nombre (Enlace a Inicio) */}
            <Link to="/guide" className="flex items-center gap-3 group z-50">
              <img 
                src={logoUPDS} 
                alt="Logo UPDS Tarija" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0085fc] sm:text-sm">UPDS</p>
                {/* Texto completo en PC, texto corto en celular para que no se desborde */}
                <h1 className="text-base font-semibold text-slate-900 sm:text-xl hidden sm:block">Plataforma de pasantías universitarias</h1>
                <h1 className="text-base font-semibold text-slate-900 sm:hidden">Pasantías UPDS</h1>
              </div>
            </Link>

            {/* Navegación para Escritorio (Oculta en móviles) */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              <NavLink to="/guide" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                Inicio
              </NavLink>
              <NavLink to="/student" end className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                Empresas
              </NavLink>
              <NavLink to="/student/success-stories" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                Casos de éxito
              </NavLink>
              <NavLink to="/admin/login" className="ml-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Acceso admin
              </NavLink>
            </nav>

            {/* Botón Hamburguesa para Móviles */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menú Desplegable para Móviles */}
          {isMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col gap-2 mt-2 border-t border-slate-100 animate-fade-in">
              <NavLink onClick={closeMenu} to="/guide" className={({ isActive }) => `block rounded-lg px-4 py-3 text-base font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
                Inicio
              </NavLink>
              <NavLink onClick={closeMenu} to="/student" end className={({ isActive }) => `block rounded-lg px-4 py-3 text-base font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
                Empresas
              </NavLink>
              <NavLink onClick={closeMenu} to="/student/success-stories" className={({ isActive }) => `block rounded-lg px-4 py-3 text-base font-medium transition ${isActive ? 'bg-[#223b87] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
                Casos de éxito
              </NavLink>
              <NavLink onClick={closeMenu} to="/admin/login" className="mt-2 block rounded-xl bg-slate-900 px-4 py-3 text-center text-base font-medium text-white transition hover:bg-slate-800">
                Acceso admin
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      {/* Contenido Principal Dinámico */}
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>

      {/* Footer del Layout */}
      <footer className="border-t border-slate-200 bg-white/90 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Gestión digital de pasantías y prácticas profesionales.</p>
          <div className="flex items-center gap-2">
            <p>Diseñado para estudiantes de la UPDS.</p>
            <img src={logoUPDS} alt="Logo UPDS" className="h-5 w-auto object-contain opacity-50" />
          </div>
        </div>
      </footer>

    </div>
  )
}

export default StudentLayout