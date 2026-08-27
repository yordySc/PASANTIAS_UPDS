import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/guide/Header'
import AnimatedBackground from '../components/guide/AnimatedBackground'
import Reveal from '../components/guide/Reveal'
import PageFooter from '../components/guide/PageFooter'
import { ChevronDown, ChevronUp, Clock3, FileText, Lightbulb, MessagesSquare, SearchCheck, UsersRound } from 'lucide-react'
import imagen2UPDS from '../assets/imagen2UPDS.jpg'
import imagen1 from '../assets/imagen1UPDS.jpg'
import logoUPDS from '../assets/logo-upds.png'
import fondoVideoUPDS from '../assets/FondoVideoUpds.mp4'
import letreroUPDS from '../assets/LetreroUPDS.png'

function Guide() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [scrollHintDirection, setScrollHintDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let idleTimer: ReturnType<typeof window.setTimeout> | undefined

    const hideHint = () => {
      setShowScrollHint(false)
      if (idleTimer) window.clearTimeout(idleTimer)
    }

    const showHintAfterIdle = () => {
      hideHint()
      idleTimer = window.setTimeout(() => {
        const footer = document.getElementById('guide-footer')
        const isNearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight + 96
        const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 160

        if (isNearFooter || isAtBottom) return

        const passedMiddle = window.scrollY > (document.documentElement.scrollHeight - window.innerHeight) / 2
        setScrollHintDirection(passedMiddle ? 'up' : 'down')
        setShowScrollHint(true)
      }, 2200)
    }

    window.addEventListener('scroll', showHintAfterIdle, { passive: true })
    window.addEventListener('touchstart', hideHint, { passive: true })
    window.addEventListener('resize', showHintAfterIdle)
    showHintAfterIdle()

    return () => {
      if (idleTimer) window.clearTimeout(idleTimer)
      window.removeEventListener('scroll', showHintAfterIdle)
      window.removeEventListener('touchstart', hideHint)
      window.removeEventListener('resize', showHintAfterIdle)
    }
  }, [])

  const scrollToAdvice = () => {
    const adviceSection = document.getElementById('consejos')
    if (!adviceSection) return

    const headerOffset = 88
    const targetTop = adviceSection.getBoundingClientRect().top + window.scrollY - headerOffset
    window.history.replaceState(null, '', '#consejos')
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
  }

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
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061f43] pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_8%_12%,rgba(41,103,205,0.72),transparent_28%),radial-gradient(circle_at_92%_38%,rgba(8,145,178,0.28),transparent_24%),linear-gradient(135deg,#061f43_0%,#0b3470_45%,#123f83_72%,#06234b_100%)]">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.06)_48%,transparent_70%)]" />
      </div>
      
      {/* Header Profesional Importado */}
      <Header />

      {/* Hero Section con Fondo Animado */}
      <section id="inicio" className="relative overflow-hidden bg-transparent px-5 py-16 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[#061f43]" />
        <video
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill object-center"
          src={fondoVideoUPDS}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,15,37,0.78)_0%,rgba(2,15,37,0.5)_52%,rgba(2,15,37,0.2)_100%)]" />
        
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <div className="grid min-w-0 gap-12 lg:grid-cols-2 lg:items-center">
            
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
                Guía Oficial de Prácticas Profesionales UPDS
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-full break-words text-4xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl tracking-tighter"
              >
                {/* PASO 6.2 - Mejorar el título */}
                <motion.span
                  className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 8 }}
                >
                  Encuentra tus Prácticas Profesionales ideales
                </motion.span>
                <br className="hidden sm:block" /> y comienza desde ahora
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mx-auto max-w-lg rounded-xl bg-slate-950/55 px-4 py-3 text-base text-sky-50 shadow-lg backdrop-blur-sm lg:mx-0 sm:text-lg"
              >
                Esta guía te acompañará en cada paso: desde la búsqueda hasta el éxito profesional en tus Prácticas Profesionales.
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
                  className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-semibold text-[#003366] shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-blue-500/40 active:scale-95"
                >
                  <span className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-700 group-hover:left-full" />
                  Explorar Empresas
                </Link>
                <button
                  type="button"
                  onClick={scrollToAdvice}
                  className="rounded-2xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-white/10 hover:border-white active:scale-95"
                >
                  Ver Consejos
                </button>
              </motion.div>
            </motion.div>

            <div className="relative mt-4 flex h-[250px] items-center justify-center sm:mt-8 sm:h-[450px] lg:mt-0 lg:h-[500px]">
              <div className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px] rounded-full sm:rounded-[4rem] border border-white/30 bg-white/10 backdrop-blur-3xl shadow-2xl translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8" />
              
              {/* PASO 6.5 - Glow detrás de las imágenes */}
              <div className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[120px] animate-pulse" />

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
        
      </section>

              {/* Información de Prácticas Profesionales */}
      <section id="informacion" className="relative overflow-hidden bg-transparent px-5 py-20 sm:py-28 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        {/* Saludos visuales que se descubren al avanzar por la secciÃ³n en mÃ³vil. */}
        <motion.img
          src={imagen1}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: -110, rotate: -24 }}
          whileInView={{ opacity: 0.9, x: 52, rotate: -12 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          viewport={{ once: true, amount: 0.65 }}
          className="pointer-events-none absolute -left-11 top-[8%] z-[1] h-36 w-28 rounded-2xl object-cover shadow-2xl sm:hidden"
        />
        <motion.img
          src={imagen1}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: 110, rotate: 24 }}
          whileInView={{ opacity: 0.9, x: -52, rotate: 12 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          viewport={{ once: true, amount: 0.65 }}
          className="pointer-events-none absolute -right-11 top-[34%] z-[1] h-40 w-28 rounded-2xl object-cover shadow-2xl sm:hidden"
        />
        <motion.img
          src={imagen1}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: -110, rotate: -24 }}
          whileInView={{ opacity: 0.9, x: 52, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          viewport={{ once: true, amount: 0.65 }}
          className="pointer-events-none absolute -left-12 top-[60%] z-[1] h-40 w-28 rounded-2xl object-cover shadow-2xl sm:hidden"
        />
        <motion.img
          src={imagen1}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: 110, rotate: 24 }}
          whileInView={{ opacity: 0.9, x: -52, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          viewport={{ once: true, amount: 0.65 }}
          className="pointer-events-none absolute -right-12 bottom-[7%] z-[1] h-36 w-28 rounded-2xl object-cover shadow-2xl sm:hidden"
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-cyan-200/30 border-l-4 border-l-[#22d3ee] bg-white/10 px-4 py-3 shadow-[0_10px_25px_rgba(0,20,60,0.2)] backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22d3ee] shadow-[0_0_0_4px_rgba(34,211,238,0.16)]"></span>
                <h2 className="text-xl font-extrabold uppercase leading-tight tracking-[0.08em] text-white sm:text-2xl">¿Qué son las Prácticas Profesionales?</h2>
              </div>
              <h3 className="mb-6 text-3xl font-bold leading-[1.08] tracking-tight text-white/90 sm:text-5xl">Una oportunidad real para <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-white bg-clip-text text-transparent">aprender y crecer</span></h3>
              <p className="mb-8 text-lg leading-relaxed text-blue-50">
                Las Prácticas Profesionales son más que un requisito académico. Son una inmersión directa en una empresa real donde aplicarás todo lo que aprendes en el aula de la UPDS.
              </p>
              <Link to="/student" className="group inline-flex items-center gap-2 font-semibold text-cyan-200 transition hover:text-white">
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
                    className="group relative isolate h-full overflow-hidden border border-[#b9d8f4] bg-white/95 p-5 shadow-[0_16px_35px_-24px_rgba(0,51,102,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-[#22d3ee]/70 hover:shadow-[0_22px_45px_-24px_rgba(0,133,252,0.42)] sm:p-6"
                  >
                    <span className="pointer-events-none absolute -right-1 -top-8 -z-10 select-none text-9xl font-black leading-none tracking-tighter text-[#2967CD]/[0.07] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#2967CD]/[0.1]">0{index + 1}</span>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center bg-[#003366] text-xl font-black text-white transition-all duration-300 [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)] group-hover:bg-[#2967CD] group-hover:pr-1">
                        {item.monogram}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.badge}</p>
                      <h3 className="text-xl font-bold tracking-tight text-[#003366] transition-colors duration-300 group-hover:text-[#2967CD] sm:text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                      <div className="mt-6 h-0.5 w-8 bg-[#2967CD] transition-all duration-300 group-hover:w-16" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consejos */}
      <section id="consejos" className="relative scroll-mt-24 overflow-hidden bg-transparent px-5 py-20 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <h2 className="inline-flex border border-cyan-200/30 border-l-4 border-l-[#22d3ee] bg-white/10 px-4 py-2 text-xl font-extrabold uppercase leading-tight tracking-[0.1em] text-white shadow-[0_10px_25px_rgba(0,20,60,0.2)] backdrop-blur-sm sm:text-2xl">Consejos Prácticos</h2>
            <h3 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-white/90 sm:text-5xl">Claves para tener éxito en tus <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-white bg-clip-text text-transparent">Prácticas Profesionales</span></h3>
          </div>
          <div className="relative mx-auto max-w-4xl space-y-3">
            <div className="absolute bottom-9 left-5 top-9 w-px bg-gradient-to-b from-[#2967CD]/10 via-[#2967CD]/50 to-[#2967CD]/10 sm:left-8" />
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
                  <div className="flex h-10 w-10 items-center justify-center border border-[#2967CD]/25 bg-white text-[#2967CD] shadow-[5px_5px_0_rgba(37,150,190,0.14)] transition-all duration-300 [clip-path:polygon(18%_0,100%_0,100%_82%,82%_100%,0_100%,0_18%)] group-hover:-translate-y-1 group-hover:bg-[#2967CD] group-hover:text-white group-hover:shadow-[7px_7px_0_rgba(37,150,190,0.2)] sm:h-14 sm:w-14">
                    <TipIcon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="relative overflow-hidden border border-slate-200/80 bg-white px-5 py-5 shadow-sm transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#2967CD] before:scale-y-0 before:transition-transform before:duration-300 group-hover:-translate-y-1 group-hover:border-[#2967CD]/35 group-hover:shadow-lg group-hover:shadow-[#2967CD]/10 group-hover:before:scale-y-100 sm:px-7 sm:py-6">
                  <span className="absolute right-4 top-3 text-[10px] font-black tracking-[0.22em] text-[#2967CD]/25 sm:right-6 sm:top-4">0{i + 1}</span>
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4 sm:gap-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-[#003366] transition-colors duration-300 group-hover:text-[#2967CD] sm:text-2xl">{tip.title}</h3>
                    <span className="border-l-2 border-[#2967CD]/30 pl-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2967CD]">Consejo clave</span>
                  </div>
                  <p className="mt-2 max-w-xl text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">{tip.text}</p>
                  <div className="mt-4 h-px w-10 bg-[#2967CD]/40 transition-all duration-300 group-hover:w-20 group-hover:bg-[#2967CD]" />
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden bg-transparent px-5 py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              { title: '¿Cómo me postulo?', text: 'Explora el catálogo, elige una oportunidad y presenta tu carta de compromiso.' },
              { title: '¿Qué debo llevar?', text: 'Tu CV, una fotocopia de tu carnet de identidad y una actitud proactiva.' },
              { title: '¿Cuánto duran las Prácticas Profesionales?', text: 'Se tiene que cumplir un total de 170 horas.' }
            ].map((faq, index) => (
              <motion.div
                key={faq.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-[24px] border border-white/80 bg-[#edf5ff] p-6 shadow-[8px_8px_18px_rgba(0,35,85,0.22),-6px_-6px_18px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_22px_rgba(0,35,85,0.25),-8px_-8px_20px_rgba(255,255,255,0.55)] ${index % 2 === 0 ? 'ml-0 md:ml-4' : 'mr-0 md:mr-4'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#2967CD] shadow-[0_0_0_5px_rgba(41,103,205,0.12)]" />
                  <div>
                    <h3 className="font-bold text-[#003366]">{faq.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{faq.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0a347c] via-[#1457b8] to-[#2967CD] p-8 text-white shadow-2xl sm:p-10 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:16px_16px]" />
            <img src={logoUPDS} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-0 h-36 w-auto max-w-[9rem] object-contain opacity-35 sm:right-6 sm:h-44 sm:max-w-[11rem] lg:h-52 lg:max-w-[13rem]" />
            <div className="relative z-10 max-w-xl">
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">UPDS · Prácticas Profesionales</p>
              <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para dar el siguiente paso?</h2>
              <p className="mt-3 text-sm text-blue-50 sm:text-base">Explora las empresas disponibles y descubre la oportunidad que mejor se adapta a ti.</p>
              <Link to="/student" className="mt-8 inline-flex items-center rounded-lg bg-white/95 px-5 py-3 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">Ver empresas</Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-center gap-0 sm:bottom-7 sm:right-7"
          >
            <motion.img
              src={letreroUPDS}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, y: 18, scale: 0.82, rotate: 4 }}
              animate={{ opacity: 1, y: [0, -4, 0], scale: 1, rotate: [0, -1.5, 0] }}
              transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.35 }, y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
              className="-mb-1 h-auto w-28 mix-blend-screen drop-shadow-[0_8px_14px_rgba(0,21,66,0.8)] sm:w-32"
            />
            <div className="isolate flex items-center gap-3 overflow-hidden rounded-2xl border border-[#8bc4f5]/60 bg-gradient-to-br from-[#003366] via-[#0a347c] to-[#2967CD] px-4 py-3 text-xs font-bold text-white shadow-[0_14px_32px_rgba(0,35,85,0.52),inset_0_1px_1px_rgba(255,255,255,0.45)] [transform:perspective(700px)_rotateX(4deg)]" aria-live="polite">
              <motion.span aria-hidden="true" className="absolute -inset-5 -z-10 bg-gradient-to-r from-[#2967CD] via-[#7dd3fc]/80 to-[#003366] blur-xl" animate={{ x: ['-30%', '30%', '-30%'], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.2),transparent_42%,rgba(0,20,60,0.3))]" />
              <span className="relative z-10 drop-shadow-sm">{scrollHintDirection === 'down' ? 'Desliza para explorar' : 'Puedes volver arriba'}</span>
              <motion.span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-xl border border-white/40 bg-white/15 shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]" animate={{ y: scrollHintDirection === 'down' ? [0, 5, 0] : [0, -5, 0], scale: [1, 1.12, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}>
                {scrollHintDirection === 'down' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageFooter />
    </div>
  )
}

export default Guide
