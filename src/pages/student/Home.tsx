import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, GraduationCap, Building2, ChevronRight, AlertCircle, Zap, Info } from 'lucide-react'
import CompanyCard from '../../components/public/CompanyCard'
import AnimatedBackground from '../../components/guide/AnimatedBackground'
import Reveal from '../../components/guide/Reveal'
import type { CompanyOffer } from '../../types'
import { getCareers } from '../../services/internships'
import graduado from '../../assets/Graduado.png'

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
        // fallback: derive from offers
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

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 px-6 py-24">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
            Explora e informate sobre tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Pasantías</span>
          </motion.h1>
          <p className="text-slate-400 text-lg">Tu guía oficial para gestionar tus prácticas profesionales.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12 -mt-09 relative z-20 space-y-20">
        
        {/* PANEL INFORMATIVO */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-[#008ec4]/35 bg-[#06334a] p-6 text-white shadow-[0_24px_70px_-24px_rgba(6,51,74,0.75)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,142,196,0.36),transparent_46%)]" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#008ec4]/25" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 text-blue-100">
                <Info size={32} />
                <h2 className="text-3xl font-bold text-white tracking-tight">¿Cómo usar este directorio?</h2>
              </div>
              <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-white/15">
                {[
                  { title: 'Solicitudes Urgentes', text: 'Empresas que requieren pasantes de inmediato. ¡Postúlate cuanto antes!', accent: 'from-rose-400 to-orange-400' },
                  { title: 'Solicitudes Directas', text: 'Empresas activas con procesos de selección vigentes.', accent: 'from-sky-400 to-cyan-400' },
                  { title: 'Convenios Generales', text: 'Convenios activos donde puedes probar suerte presentando tu carta.', accent: 'from-emerald-400 to-lime-400' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative border-t border-white/15 px-1 py-7 transition-colors duration-300 first:border-t-0 active:bg-white/[0.06] lg:border-l lg:border-t-0 lg:px-8 lg:py-3 lg:first:border-l-0"
                  >
                    <div className={`mb-5 h-1 w-10 transition-all duration-300 group-hover:w-16 ${index === 0 ? 'bg-rose-300' : index === 1 ? 'bg-sky-300' : 'bg-teal-300'}`} />
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-black ${index === 0 ? 'border-rose-300/50 bg-rose-300/10 text-rose-200' : index === 1 ? 'border-sky-300/50 bg-sky-300/10 text-sky-200' : 'border-teal-300/50 bg-teal-300/10 text-teal-200'}`}>
                        {index === 0 ? <Zap size={19} /> : index === 1 ? <Building2 size={19} /> : <AlertCircle size={19} />}
                      </div>
                      <span className="pt-1 text-xs font-bold tracking-[0.18em] text-white/40">0{index + 1}</span>
                    </div>
                    <div className="mt-5">
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-blue-50/80">{item.text}</p>
                      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">Ver esta categoría ↓</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* BUSCADOR */}
        <Reveal>
          <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="text-slate-400 mr-3" size={20} />
              <input type="text" placeholder="Buscar empresa o área..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent py-4 outline-none" />
            </div>
            <div className="md:w-64 flex items-center px-4 bg-slate-50 rounded-2xl border border-slate-200">
              <GraduationCap className="text-slate-400 mr-3" size={20} />
              <select value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)} className="w-full bg-transparent py-4 outline-none cursor-pointer">
                {careers.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </Reveal>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12">
          <div className="space-y-16">
            {offers.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Aún no hay pasantías publicadas</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Cuando el administrador registre ofertas desde el panel, aparecerán aquí automáticamente.</p>
              </div>
            ) : null}
            {urgentes.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center gap-3"><Zap size={24} /> Solicitudes Urgentes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {urgentes.map((o: CompanyOffer) => (
                    <div key={o.id}>
                      <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3"><Building2 className="text-blue-600" /> Solicitudes Directas</h3>
              <div className="space-y-6">
                {directas.map((o: CompanyOffer) => (
                  <div key={o.id}>
                    <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                  </div>
                ))}
              </div>
            </section>

            {convenios.length > 0 && (
              <section className="pt-8 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-500 mb-8 flex items-center gap-3"><AlertCircle size={20} /> Convenios Generales</h3>
                <div className="space-y-4 opacity-70">
                  {convenios.map((o: CompanyOffer) => (
                    <div key={o.id}>
                      <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <div className="sticky top-28 isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0a347c] via-[#1457b8] to-[#008ec4] p-8 text-white shadow-2xl">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:16px_16px]" />
              <img src={graduado} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-5 z-0 w-64 opacity-65" />
              <div className="relative z-10">
                <p className="mb-8 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100">UPDS · Trayectorias</p>
                <h3 className="text-2xl font-bold mb-2">Casos de Éxito</h3>
                <p className="text-blue-50 text-sm mb-6 max-w-[13rem]">Historias de estudiantes que lograron su puesto ideal.</p>
                <Link to="/student/success-stories" className="inline-flex items-center rounded-lg bg-white/95 px-5 py-3 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">Ver historias →</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Home
