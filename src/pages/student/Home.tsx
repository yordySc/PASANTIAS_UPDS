import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, GraduationCap, Building2, ChevronRight, AlertCircle, Zap, Info } from 'lucide-react'
import CompanyCard from '../../components/public/CompanyCard'
import AnimatedBackground from '../../components/guide/AnimatedBackground'
import Reveal from '../../components/guide/Reveal'
import PageFooter from '../../components/guide/PageFooter'
import type { CompanyOffer } from '../../types'
import { getCareers } from '../../services/internships'
import graduado from '../../assets/Graduado.png'
import upds3D from '../../assets/UPDS_3D.png'

interface HomeProps {
  offers: CompanyOffer[]
}

function Home({ offers }: HomeProps) {
  const [selectedCareer, setSelectedCareer] = useState<string>('Todas')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null)

  const [careers, setCareers] = useState<string[]>(['Todas'])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const remote = await getCareers()
        if (!mounted) return
        const names = remote.map((c) => c.name)
        setCareers(['Todas', ...Array.from(new Set(names))])
      } catch {
        const values = offers.flatMap((offer: CompanyOffer) => offer.careers)
        setCareers(['Todas', ...Array.from(new Set(values))])
      }
    }
    void load()
    return () => { mounted = false }
  }, [offers])

  const { urgentes, directas, convenios } = useMemo(() => {
    const norm = searchTerm.trim().toLowerCase()
    const filtered = offers.filter((o: CompanyOffer) => 
      (selectedCareer === 'Todas' || o.careers.includes(selectedCareer)) &&
      [o.institution, o.description, ...o.careers].some(v => v.toLowerCase().includes(norm))
    )

    const isActive = (offer: CompanyOffer) => {
      const expired = Boolean(offer.expiresAt && new Date(`${offer.expiresAt}T23:59:59`) < new Date())
      return offer.visible && !expired && offer.filled < offer.vacancies
    }

    const sorted = filtered.sort((a: CompanyOffer, b: CompanyOffer) => {
      if (a.visible !== b.visible) return a.visible ? -1 : 1
      if (a.immediateAcceptance !== b.immediateAcceptance) return a.immediateAcceptance ? -1 : 1
      return 0
    })

    return {
      urgentes: sorted.filter(o => isActive(o) && o.immediateAcceptance),
      directas: sorted.filter(o => isActive(o) && !o.immediateAcceptance),
      convenios: sorted.filter(o => !isActive(o))
    }
  }, [offers, searchTerm, selectedCareer])

  const scrollToSearch = () => {
    document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION RENOVADO */}
      <section className="relative isolate flex min-h-[70vh] flex-col justify-center overflow-hidden bg-slate-900 px-5 py-16 sm:px-6 lg:py-28">
        <AnimatedBackground />
        
        {/* Fondo de cuadrícula con desvanecimiento */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(rgba(125,211,252,0.5)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        {/* Luces flotantes dinámicas */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[80px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />

        {/* Modelo 3D: Ahora visible en móviles (pequeño/fondo) y destacado en PC */}
        <motion.img
          src={upds3D}
          alt="Logo UPDS 3D"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 0.85, scale: 1, y: [0, -15, 0], rotate: [-2, 2, -2] }}
          transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          className="pointer-events-none absolute -bottom-2 -right-16 z-0 w-72 opacity-20 sm:w-80 md:opacity-40 lg:bottom-0 lg:right-[5%] lg:w-[32rem] lg:opacity-90 xl:w-[38rem]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl text-center lg:text-left">
          <div className="mx-auto max-w-3xl lg:mx-0">
            {/* Etiqueta animada */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              Directorio UPDS
            </motion.div>

            {/* Título principal con degradado */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explora e infórmate sobre tus <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Pasantías</span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
              Tu guía oficial para gestionar tus prácticas profesionales. Encuentra la oportunidad perfecta para iniciar tu trayectoria laboral.
            </motion.p>

            {/* Nuevo Botón de Acción (Reemplaza los rectángulos) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 flex justify-center lg:justify-start">
              <button onClick={scrollToSearch} className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95">
                <Search size={18} className="transition-transform group-hover:-rotate-12" />
                Buscar oportunidades
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Identificador para el scroll automático */}
      <main id="directorio" className="relative z-20 mx-auto -mt-10 max-w-7xl space-y-20 px-4 py-10 sm:px-6 sm:py-12">
        
        {/* PANEL INFORMATIVO */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-gradient-to-br from-[#031d33] via-[#06334a] to-[#0b4f6c] p-6 text-white shadow-[0_30px_80px_-30px_rgba(2,22,38,0.85)] sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_25%)]" />
            <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -bottom-10 right-5 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-sm">
                    <Info size={14} />
                    Guía paso a paso
                  </div>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Cómo usar este directorio?</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50/85 sm:text-base">
                    Elige la categoría según la urgencia del proceso y encuentra la oportunidad que mejor se adapta a tu perfil.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Solicitudes Urgentes', text: 'Empresas que requieren pasantes de inmediato. ¡Postúlate cuanto antes!', accent: 'from-rose-400 to-orange-400', icon: Zap, badge: 'Urgente' },
                  { title: 'Solicitudes Directas', text: 'Empresas activas con procesos de selección vigentes.', accent: 'from-sky-400 to-cyan-400', icon: Building2, badge: 'Activa' },
                  { title: 'Convenios Generales', text: 'Convenios activos donde puedes probar suerte presentando tu carta.', accent: 'from-emerald-400 to-lime-400', icon: AlertCircle, badge: 'Flexible' }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.12, duration: 0.45 }}
                      whileHover={{ y: -8, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition duration-500 group-hover:opacity-20`} />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${index === 0 ? 'border-rose-300/40 bg-rose-300/10 text-rose-100' : index === 1 ? 'border-sky-300/40 bg-sky-300/10 text-sky-100' : 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'}`}>
                            <Icon size={20} />
                          </div>
                          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
                            {item.badge}
                          </span>
                        </div>
                        <div className="mt-5">
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-blue-50/80">{item.text}</p>
                        </div>
                        <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7dd3fc] transition duration-300 group-hover:gap-3">
                          <span>Ver esta categoría</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* BUSCADOR */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="mr-3 text-slate-400" size={20} />
              <input type="text" placeholder="Buscar empresa o área..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent py-4 outline-none" />
            </div>
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 md:w-64">
              <GraduationCap className="mr-3 text-slate-400" size={20} />
              <select value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)} className="w-full cursor-pointer bg-transparent py-4 outline-none">
                {careers.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </Reveal>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-16">
            {offers.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Aún no hay pasantías publicadas</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Cuando el administrador registre ofertas desde el panel, aparecerán aquí automáticamente.</p>
              </div>
            ) : null}
            {urgentes.length > 0 && (
              <section>
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-md">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Solicitudes Urgentes</h3>
                    <p className="text-sm text-slate-500">Oportunidades que requieren respuesta inmediata.</p>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {urgentes.map((o: CompanyOffer) => (
                    <div key={o.id} className="min-w-0">
                      <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-md">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">Solicitudes Directas</h3>
                  <p className="text-sm text-slate-500">Procesos activos con selección vigente.</p>
                </div>
              </div>
              <div className="space-y-6">
                {directas.map((o: CompanyOffer) => (
                  <div key={o.id} className="min-w-0">
                    <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                  </div>
                ))}
              </div>
            </section>

            {convenios.length > 0 && (
              <section className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-white shadow-md">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Convenios Generales</h3>
                    <p className="text-sm text-slate-500">Opciones con procesos más flexibles.</p>
                  </div>
                </div>
                <div className="space-y-4 opacity-90">
                  {convenios.map((o: CompanyOffer) => (
                    <div key={o.id} className="min-w-0">
                      <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="min-w-0">
            <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0a347c] via-[#1457b8] to-[#008ec4] p-6 text-white shadow-2xl sm:p-8 lg:sticky lg:top-28">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:16px_16px]" />
              <img src={graduado} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-5 -right-3 z-0 w-52 opacity-40 sm:w-64 sm:opacity-65" />
              <div className="relative z-10">
                <p className="mb-8 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">UPDS · Trayectorias</p>
                <h3 className="mb-2 text-2xl font-bold">Casos de Éxito</h3>
                <p className="mb-6 max-w-[13rem] text-sm text-blue-50">Historias de estudiantes que lograron su puesto ideal.</p>
                <Link to="/student/success-stories" className="relative z-10 inline-flex max-w-full items-center rounded-lg bg-white/95 px-4 py-3 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">Ver historias →</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <PageFooter />
    </div>
  )
}

export default Home
