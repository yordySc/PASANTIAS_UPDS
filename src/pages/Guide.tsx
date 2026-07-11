import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoUPDS from '../assets/logo-upds.png'
import imagen2UPDS from '../assets/imagen2UPDS.jpg'
import imagen1 from '../assets/imagen1UPDS.jpg'

function Guide() {
  // Estado para controlar si el menú del celular está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header / Navegación Principal */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-2xl shadow-sm">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo y Nombre UPDS */}
            <Link to="/student" className="flex items-center gap-3 group z-50">
              <img 
                src={logoUPDS} 
                alt="Logo UPDS Tarija" 
                className="h-10 sm:h-12 w-auto object-contain transition-all group-hover:scale-105 duration-300" 
              />
              <div className="-space-y-1">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.125em] text-[#0085fc]">UNIVERSIDAD PRIVADA</p>
                <p className="text-xl sm:text-2xl font-semibold tracking-tighter text-slate-900">DOMINGO SAVIO</p>
              </div>
            </Link>

            {/* Menú para Escritorio (Oculto en móviles) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#inicio" className="text-slate-600 hover:text-[#223b87] transition">Inicio</a>
              <a href="#informacion" className="text-slate-600 hover:text-[#223b87] transition">Información</a>
              <Link to="/student" className="text-slate-600 hover:text-[#223b87] transition">Empresas</Link>
              <a href="#consejos" className="text-slate-600 hover:text-[#223b87] transition">Consejos</a>
              <a href="#faq" className="text-slate-600 hover:text-[#223b87] transition">Preguntas</a>
            </nav>

            {/* Botones de la derecha */}
            <div className="flex items-center gap-3 z-50">
              <Link 
                to="/student" 
                className="hidden sm:inline-block rounded-2xl bg-gradient-to-r from-[#223b87] to-[#0085fc] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Explorar Empresas
              </Link>

              {/* Botón Hamburguesa solo para Móviles */}
              <button 
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
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
          </div>

          {/* Menú Desplegable para Móviles */}
          {isMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col gap-4 mt-2 border-t border-slate-100 animate-fade-in">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium px-2 py-1 hover:text-[#223b87] hover:bg-slate-50 rounded-lg">Inicio</a>
              <a href="#informacion" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium px-2 py-1 hover:text-[#223b87] hover:bg-slate-50 rounded-lg">Información</a>
              <Link to="/student" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium px-2 py-1 hover:text-[#223b87] hover:bg-slate-50 rounded-lg">Empresas</Link>
              <a href="#consejos" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium px-2 py-1 hover:text-[#223b87] hover:bg-slate-50 rounded-lg">Consejos</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium px-2 py-1 hover:text-[#223b87] hover:bg-slate-50 rounded-lg">Preguntas</a>
              <Link 
                to="/student" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 text-center rounded-xl bg-gradient-to-r from-[#223b87] to-[#0085fc] px-4 py-3 text-sm font-semibold text-white shadow-md"
              >
                Explorar Empresas
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-[#223b87] via-[#1e3a8a] to-[#0085fc] px-5 py-16 sm:py-28 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-sky-100 backdrop-blur">
                Guía Oficial de Pasantías UPDS
              </p>
              
              <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl tracking-tighter">
                Encuentra tu pasantía ideal<br className="hidden sm:block" /> y construye tu futuro
              </h1>

              <p className="mx-auto lg:mx-0 max-w-lg text-base sm:text-lg text-sky-100">
                Esta guía te acompañará en cada paso: desde la búsqueda hasta el éxito profesional en tu pasantía.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link 
                  to="/student" 
                  className="rounded-2xl bg-white px-8 py-4 font-semibold text-[#223b87] shadow-xl transition hover:bg-sky-50 hover:-translate-y-0.5"
                >
                  Explorar Empresas
                </Link>
                <a 
                  href="#consejos" 
                  className="rounded-2xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition hover:bg-white/10 hover:border-white"
                >
                  Ver Consejos
                </a>
              </div>
            </div>

            {/* FOTOS ADAPTADAS PARA CELULAR Y PC */}
            <div className="relative flex justify-center items-center h-[320px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0">
              <div className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px] rounded-full sm:rounded-[4rem] border border-white/30 bg-white/10 backdrop-blur-3xl shadow-2xl translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8" />
              
              <img 
                src={imagen1} 
                alt="Estudiantes en práctica" 
                className="absolute right-[10%] sm:right-[15%] lg:right-0 top-0 sm:top-4 h-[200px] w-[160px] sm:h-[280px] sm:w-[240px] lg:h-[320px] lg:w-[280px] rounded-3xl lg:rounded-[3rem] object-cover shadow-2xl border-2 lg:border-4 border-white/40 z-10 rotate-6 transition-transform hover:rotate-0 duration-500" 
              />

              <img 
                src={imagen2UPDS} 
                alt="Instalaciones UPDS" 
                className="absolute left-[10%] sm:left-[15%] lg:left-0 bottom-0 sm:bottom-4 h-[230px] w-[180px] sm:h-[320px] sm:w-[260px] lg:h-[360px] lg:w-[320px] rounded-3xl lg:rounded-[3.5rem] object-cover shadow-2xl border-2 lg:border-4 border-white/80 z-20 -rotate-3 transition-transform hover:rotate-0 duration-500" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* Información Pasantías (DISEÑO MEJORADO CON ICONOS) */}
      <section id="informacion" className="px-5 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Lado Izquierdo - Texto Principal */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#0085fc] animate-pulse"></span>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0085fc]">¿Qué es una pasantía?</p>
              </div>
              
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
                Una oportunidad real para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#223b87] to-[#0085fc]">aprender y crecer</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-slate-600 mb-8">
                Una pasantía es más que un requisito académico. Es una inmersión directa en una empresa real donde aplicarás todo lo que aprendes en el aula de la UPDS, desarrollarás nuevas habilidades técnicas y empezarás a construir tu red de contactos profesionales.
              </p>
              
              <Link 
                to="/student" 
                className="inline-flex items-center gap-2 text-[#0085fc] font-semibold hover:text-[#223b87] transition group"
              >
                Ver empresas disponibles
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>

            {/* Lado Derecho - Tarjetas con Iconos */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { 
                  colorBg: 'bg-blue-100', colorText: 'text-blue-600', 
                  title: 'Aprende', 
                  desc: 'Aplica tus conocimientos teóricos en entornos laborales dinámicos.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                },
                { 
                  colorBg: 'bg-emerald-100', colorText: 'text-emerald-600', 
                  title: 'Conecta', 
                  desc: 'Crea relaciones profesionales valiosas para tu futuro.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                },
                { 
                  colorBg: 'bg-amber-100', colorText: 'text-amber-600', 
                  title: 'Destaca', 
                  desc: 'Demuestra tu potencial y gana experiencia demostrable en tu CV.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.114.471-.397.836-.786.591L12 17.58l-4.71 2.943c-.389.245-.9-.12-.786-.591l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                },
                { 
                  colorBg: 'bg-violet-100', colorText: 'text-violet-600', 
                  title: 'Avanza', 
                  desc: 'Da el primer gran paso para impulsar tu carrera profesional.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                },
              ].map((item) => (
                <div key={item.title} className="group relative rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.colorBg} ${item.colorText} transition-transform group-hover:scale-110`}>
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Consejos */}
      <section id="consejos" className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0085fc]">Consejos Prácticos</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">Claves para tener éxito en tu pasantía</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Prepara un CV profesional", desc: "Destaca logros académicos, proyectos universitarios, habilidades técnicas y experiencia previa." },
              { title: "Investiga la empresa", desc: "Conoce su misión, valores, proyectos y cultura organizacional antes de postular." },
              { title: "Sé proactivo", desc: "Toma iniciativa, propón ideas y demuestra interés genuino en aprender." },
              { title: "Cumple con los horarios", desc: "La puntualidad y responsabilidad son valores altamente valorados por las empresas." },
              { title: "Pide feedback constantemente", desc: "Mejora tu desempeño recibiendo retroalimentación de tu supervisor." },
              { title: "Construye tu red", desc: "Aprovecha la oportunidad para conectar con profesionales del sector." },
            ].map((tip, index) => (
              <div key={index} className="group rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition hover:shadow-2xl hover:-translate-y-1">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#223b87] to-[#0085fc] flex items-center justify-center text-white text-2xl mb-6">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section id="faq" className="px-5 py-20 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0085fc]">Resolviendo Dudas</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Preguntas Frecuentes</h2>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">¿Cómo me postulo a una pasantía?</h3>
              <p className="mt-2 text-slate-600">Debes explorar nuestro catálogo de empresas en la plataforma, elegir la que se adapte a tu carrera y luego acercarte a las oficinas de pasantías con tu folder amarillo para solicitar la carta de solicitud oficial.</p>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">¿Qué necesito para estar habilitado?</h3>
              <p className="mt-2 text-slate-600">Por lo general, debes estar iniciando o cursando a partir del sexto semestre y no tener materias pendientes muy rezagadas. La administración verificará tu estado en el sistema.</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">¿Dónde descargo mi planilla de asistencia?</h3>
              <p className="mt-2 text-slate-600">Puedes descargar los documentos requeridos (como la planilla de asistencia y evaluación) en la sección de "Documentos" de esta plataforma, siempre y cuando tu práctica ya haya sido programada oficialmente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#223b87] to-[#0085fc] px-5 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold sm:text-5xl">¿Listo para dar el siguiente paso?</h2>
          <p className="mt-6 text-xl text-sky-100">Explora las empresas disponibles y comienza tu camino profesional.</p>
          <Link 
            to="/student" 
            className="mt-10 inline-block rounded-2xl bg-white px-10 py-4 text-lg font-semibold text-[#223b87] shadow-2xl hover:bg-sky-50 transition"
          >
            Ver todas las empresas →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <img 
                  src={logoUPDS} 
                  alt="Logo UPDS Tarija" 
                  className="h-11 w-auto object-contain" 
                />
                <p className="font-semibold text-xl text-slate-900">UPDS</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">Plataforma de Pasantías Universitarias</p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#inicio" className="hover:text-[#223b87]">Inicio</a></li>
                <li><Link to="/student" className="hover:text-[#223b87]">Empresas</Link></li>
                <li><a href="#consejos" className="hover:text-[#223b87]">Consejos</a></li>
                <li><a href="#faq" className="hover:text-[#223b87]">Preguntas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/student/success-stories" className="hover:text-[#223b87]">Casos de Éxito</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>📧 pasantias@upds.edu.bo</li>
                <li>📍 Tarija, Bolivia</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t pt-8 text-center text-sm text-slate-500">
            © 2026 Universidad Privada Domingo Savio • Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Guide