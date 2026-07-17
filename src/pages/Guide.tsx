import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/guide/Header'
import AnimatedBackground from '../components/guide/AnimatedBackground'
import Reveal from '../components/guide/Reveal'
import logoUPDS from '../assets/logo-upds.png'
import { Clock3, FileText, Lightbulb, Mail, MapPin, MessagesSquare, Phone, SearchCheck, UsersRound } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import imagen2UPDS from '../assets/imagen2UPDS.jpg'
import imagen1 from '../assets/imagen1UPDS.jpg'
import upds3D from '../assets/UPDS_3D.png'

function Guide() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const benefits = [
    {
      title: 'Aprende',
      monogram: 'U',
      desc: 'Aplica tus conocimientos teóricos en entornos laborales dinámicos y reales.',
      badge: 'Experiencia real'
    },
    {
      title: 'Conecta',
      monogram: 'P',
      desc: 'Construye relaciones profesionales que amplíen tus oportunidades de futuro.',
      badge: 'Red profesional'
    },
    {
      title: 'Destaca',
      monogram: 'D',
      desc: 'Muestra tu potencial, tu iniciativa y tu crecimiento desde el primer día.',
      badge: 'CV en acción'
    },
    {
      title: 'Avanza',
      monogram: 'S',
      desc: 'Da el primer gran paso hacia una carrera sólida, con confianza y propósito.',
      badge: 'Tu siguiente etapa'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      
      {/* Header Profesional Importado */}
      <Header />

      {/* Hero Section con Fondo Animado */}
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-[#223b87] via-[#1e3a8a] to-[#0085fc] px-5 py-16 sm:py-28 lg:py-32">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -80 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.9 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left relative"
            >
              {/* PASO 6.3 - Glow detrás del texto */}
              <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />

              {/* PASO 6.1 - Mejorar el Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: .8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: .1, duration: .6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[4px] text-white backdrop-blur-xl shadow-lg animate-glow"
              >
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>
                Guía Oficial de Pasantías UPDS
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl tracking-tighter"
              >
                {/* PASO 6.2 - Mejorar el título */}
                <motion.span
                  className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 8 }}
                >
                  Encuentra tu pasantía ideal
                </motion.span>
                <br className="hidden sm:block" /> y comienza desde ahora
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mx-auto lg:mx-0 max-w-lg text-base sm:text-lg text-sky-100"
              >
                Esta guía te acompañará en cada paso: desde la búsqueda hasta el éxito profesional en tu pasantía.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
              >
                {/* PASO 6.4 - Mejorar los botones */}
                <Link 
                  to="/student" 
                  className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-semibold text-[#223b87] shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-blue-500/40 active:scale-95"
                >
                  <span className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-700 group-hover:left-full" />
                  Explorar Empresas
                </Link>
                <a 
                  href="#consejos" 
                  className="rounded-2xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-white/10 hover:border-white active:scale-95"
                >
                  Ver Consejos
                </a>
              </motion.div>
            </motion.div>

            <div className="relative flex justify-center items-center h-[320px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0">
              <div className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px] rounded-full sm:rounded-[4rem] border border-white/30 bg-white/10 backdrop-blur-3xl shadow-2xl translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8" />
              
              {/* PASO 6.5 - Glow detrás de las imágenes */}
              <div className="absolute h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[120px] animate-pulse" />

              {/* PASO 6.6 - Mejorar las imágenes */}
              <img 
                src={imagen1} 
                alt="Estudiantes en práctica" 
                className="animate-float absolute right-[10%] sm:right-[15%] lg:right-0 top-0 sm:top-4 h-[200px] w-[160px] sm:h-[280px] sm:w-[240px] lg:h-[320px] lg:w-[280px] rounded-3xl lg:rounded-[3rem] object-cover shadow-2xl border-2 lg:border-4 border-white/40 z-10 rotate-6 transition-transform hover:rotate-0 hover:shadow-cyan-300/50 hover:scale-110 duration-500" 
              />

              <img 
                src={imagen2UPDS} 
                alt="Instalaciones UPDS" 
                className="animate-float animation-delay-2000 absolute left-[10%] sm:left-[15%] lg:left-0 bottom-0 sm:bottom-4 h-[230px] w-[180px] sm:h-[320px] sm:w-[260px] lg:h-[360px] lg:w-[320px] rounded-3xl lg:rounded-[3.5rem] object-cover shadow-2xl border-2 lg:border-4 border-white/80 z-20 -rotate-3 transition-transform hover:rotate-0 hover:scale-110 duration-500" 
              />
            </div>
          </div>
        </div>
        
        {/* PASO 6.7 - Indicador para bajar */}
        <div className="absolute bottom-8 left-1/2 -z-0 -translate-x-1/2 flex flex-col items-center text-white">
          <p className="text-sm tracking-widest uppercase opacity-70">Desliza</p>
          <div className="mt-4 animate-bounce text-3xl">↓</div>
        </div>
      </section>

      {/* Información Pasantías */}
      <section id="informacion" className="px-5 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#0085fc] animate-pulse"></span>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0085fc]">¿Qué es una pasantía?</p>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">Una oportunidad real para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#223b87] to-[#0085fc]">aprender y crecer</span></h2>
              <p className="text-lg leading-relaxed text-slate-600 mb-8">
                Una pasantía es más que un requisito académico. Es una inmersión directa en una empresa real donde aplicarás todo lo que aprendes en el aula de la UPDS.
              </p>
              <Link to="/student" className="inline-flex items-center gap-2 text-[#0085fc] font-semibold hover:text-[#223b87] transition group">
                Ver empresas disponibles <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <motion.div
                    initial={{ opacity: 0, x: -24, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.985 }}
                    className="group relative isolate h-full overflow-hidden border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:border-[#008ec4]/45 hover:shadow-[0_20px_42px_-24px_rgba(0,133,252,0.32)] sm:p-6"
                  >
                    <span className="pointer-events-none absolute -right-1 -top-8 -z-10 select-none text-9xl font-black leading-none tracking-tighter text-[#008ec4]/[0.07] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#008ec4]/[0.1]">0{index + 1}</span>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center bg-slate-900 text-xl font-black text-white transition-all duration-300 [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)] group-hover:bg-[#008ec4] group-hover:pr-1">
                        {item.monogram}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.badge}</p>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#008ec4] sm:text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                      <div className="mt-6 h-0.5 w-8 bg-[#008ec4] transition-all duration-300 group-hover:w-16" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consejos */}
      <section id="consejos" className="overflow-hidden bg-[#f7fbfc] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0085fc]">Consejos Prácticos</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">Claves para tener éxito en tu pasantía</h2>
          </div>
          <div className="relative mx-auto max-w-4xl space-y-3">
            <div className="absolute bottom-9 left-5 top-9 w-px bg-gradient-to-b from-[#2596be]/10 via-[#2596be]/50 to-[#2596be]/10 sm:left-8" />
            {[
              { title: 'Prepara un CV profesional', text: 'Destaca tus logros con una propuesta clara y ordenada.', icon: FileText },
              { title: 'Investiga la empresa', text: 'Conoce su misión y objetivos para presentarte con más seguridad.', accent: 'from-violet-500 to-fuchsia-500' },
              { title: 'Sé proactivo', text: 'Pregunta, aprende y demuestra interés desde el primer día.', accent: 'from-emerald-500 to-lime-500' },
              { title: 'Cumple con los horarios', text: 'La disciplina marca la diferencia en tus primeras experiencias.', accent: 'from-amber-500 to-orange-500' },
              { title: 'Pide feedback', text: 'Tu crecimiento mejora cuando solicitas orientación constante.', accent: 'from-sky-500 to-cyan-500' },
              { title: 'Construye tu red', text: 'Cada conversación puede abrirte nuevas oportunidades.', accent: 'from-rose-500 to-pink-500' }
            ].map((tip, i) => {
              const TipIcon = [FileText, SearchCheck, Lightbulb, Clock3, MessagesSquare, UsersRound][i]

              return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.99, x: 4 }}
                className="group relative grid grid-cols-[3.25rem_1fr] gap-4 py-2 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
              >
                <div className="relative z-10 pt-3 sm:pt-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#2596be]/25 bg-white text-[#2596be] shadow-[5px_5px_0_rgba(37,150,190,0.14)] transition-all duration-300 [clip-path:polygon(18%_0,100%_0,100%_82%,82%_100%,0_100%,0_18%)] group-hover:-translate-y-1 group-hover:bg-[#2596be] group-hover:text-white group-hover:shadow-[7px_7px_0_rgba(37,150,190,0.2)] sm:h-14 sm:w-14">
                    <TipIcon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="relative overflow-hidden border border-slate-200/80 bg-white px-5 py-5 shadow-sm transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#2596be] before:scale-y-0 before:transition-transform before:duration-300 group-hover:-translate-y-1 group-hover:border-[#2596be]/35 group-hover:shadow-lg group-hover:shadow-[#2596be]/10 group-hover:before:scale-y-100 sm:px-7 sm:py-6">
                  <span className="absolute right-4 top-3 text-[10px] font-black tracking-[0.22em] text-[#2596be]/25 sm:right-6 sm:top-4">0{i + 1}</span>
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4 sm:gap-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#2596be] sm:text-2xl">{tip.title}</h3>
                    <span className="border-l-2 border-[#2596be]/30 pl-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2596be]">Consejo clave</span>
                  </div>
                  <p className="mt-2 max-w-xl text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">{tip.text}</p>
                  <div className="mt-4 h-px w-10 bg-[#2596be]/40 transition-all duration-300 group-hover:w-20 group-hover:bg-[#2596be]" />
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              { title: '¿Cómo me postulo?', text: 'Explora el catálogo, elige una oportunidad y acércate a pasantias.' },
              { title: '¿Qué debo llevar?', text: 'Tu CV, una fotocopia de tu carnet de identidad y una actitud proactiva.' },
              { title: '¿Cuánto dura una pasantía?', text: 'Se tiene que cumplir un total de 170 horas.' }
            ].map((faq, index) => (
              <motion.div
                key={faq.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm ${index % 2 === 0 ? 'ml-0 md:ml-4' : 'mr-0 md:mr-4'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0085fc]" />
                  <div>
                    <h3 className="font-bold text-slate-900">{faq.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{faq.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#223b87] to-[#0085fc] px-5 py-20 text-center text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:18px_18px]" />
        <img src={upds3D} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-60 -translate-x-1/2 opacity-20 sm:left-auto sm:-right-10 sm:w-[28rem] sm:translate-x-0 sm:opacity-25 lg:right-10 lg:w-[30rem]" />
        <div className="relative z-10">
        <h2 className="text-4xl font-bold">¿Listo para dar el siguiente paso?</h2>
        <Link to="/student" className="mt-10 inline-block rounded-2xl bg-white px-10 py-4 font-semibold text-[#223b87]">Ver empresas</Link>
        </div>
      </section>

      <footer className="border-t bg-white px-5 py-12 text-slate-600">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="space-y-4">
              <img src={logoUPDS} alt="UPDS" className="h-12 w-auto" />
              <p className="text-sm text-slate-700">Universidad Privada Domingo Savio — Guía oficial de pasantías.</p>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} /> <span>B/ German Busch esquina Fabián Ruiz , Ciudad Tarija, Bolivia</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} /> <a href="tel:+591 75111830" className="hover:underline">+591 75111830</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} /> <a href="mailto:contacto@upds.edu.bo" className="hover:underline">infoupds.tarija@upds.edu.bo</a>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Enlaces rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/student" className="hover:underline">Empresas</a></li>
                <li><a href="/student/success-stories" className="hover:underline">Casos de éxito</a></li>
                <li><a href="/guide" className="hover:underline">Guía</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Síguenos</h4>
              <p className="text-sm text-slate-600 mb-3">Sigue a la UPDS en redes para mantenerte al día.</p>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/universidadprivadadomingosaviotarija" target="_blank" rel="noreferrer" aria-label="Facebook UPDS Tarija" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-white transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30">
                  <FaFacebookF size={18} />
                </a>
                <a href="https://www.instagram.com/upds_tarija?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram UPDS Tarija" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30">
                  <FaInstagram size={19} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-slate-500">© 2026 Universidad Privada Domingo Savio • Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  )
}

export default Guide
