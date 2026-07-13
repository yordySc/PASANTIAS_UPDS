import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/guide/Header'
import AnimatedBackground from '../components/guide/AnimatedBackground'
import Reveal from '../components/guide/Reveal'
import logoUPDS from '../assets/logo-upds.png'
import imagen2UPDS from '../assets/imagen2UPDS.jpg'
import imagen1 from '../assets/imagen1UPDS.jpg'

function Guide() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <motion.p 
                initial={{ opacity: 0, scale: .8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: .1, duration: .6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[4px] text-white backdrop-blur-xl shadow-lg animate-glow"
              >
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>
                Guía Oficial de Pasantías UPDS
              </motion.p>
              
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
          <div className="mt-2 animate-bounce text-3xl">↓</div>
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
            <div className="grid gap-6 sm:grid-cols-2">
              {[ 
                {colorBg:'bg-blue-100', colorText:'text-blue-600', title:'Aprende', desc:'Aplica tus conocimientos teóricos en entornos laborales dinámicos.'}, 
                {colorBg:'bg-emerald-100', colorText:'text-emerald-600', title:'Conecta', desc:'Crea relaciones profesionales valiosas para tu futuro.'}, 
                {colorBg:'bg-amber-100', colorText:'text-amber-600', title:'Destaca', desc:'Demuestra tu potencial y gana experiencia demostrable en tu CV.'}, 
                {colorBg:'bg-violet-100', colorText:'text-violet-600', title:'Avanza', desc:'Da el primer gran paso para impulsar tu carrera profesional.'} 
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.15}>
                  <div className="group relative overflow-hidden rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl transition-all duration-500 group-hover:scale-150" />
                    <div className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.colorBg} ${item.colorText} transition-all duration-500 group-hover:rotate-12 group-hover:scale-125`}>
                      {item.title[0]}
                    </div>
                    <h3 className="relative z-10 mb-2 text-xl font-bold text-slate-900 transition-all group-hover:text-blue-700">
                      {item.title}
                    </h3>
                    <p className="relative z-10 text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
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
            {[ "Prepara un CV profesional", "Investiga la empresa", "Sé proactivo", "Cumple con los horarios", "Pide feedback", "Construye tu red" ].map((t, i) => (
              <div key={i} className="group rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition hover:shadow-2xl hover:-translate-y-1">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#223b87] to-[#0085fc] flex items-center justify-center text-white text-2xl mb-6">{i + 1}</div>
                <h3 className="font-bold">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border">
              <h3 className="font-bold">¿Cómo me postulo?</h3>
              <p className="text-sm text-slate-600">Explora el catálogo y acércate a oficinas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#223b87] to-[#0085fc] px-5 py-20 text-center text-white">
        <h2 className="text-4xl font-bold">¿Listo para dar el siguiente paso?</h2>
        <Link to="/student" className="mt-10 inline-block rounded-2xl bg-white px-10 py-4 font-semibold text-[#223b87]">Ver empresas</Link>
      </section>

      <footer className="border-t bg-white px-5 py-16 text-center text-sm text-slate-500">
        © 2026 Universidad Privada Domingo Savio • Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Guide