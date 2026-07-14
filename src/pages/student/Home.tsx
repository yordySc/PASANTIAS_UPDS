import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, GraduationCap, Building2, Award, ChevronRight, AlertCircle, Zap, Info } from 'lucide-react'
import CompanyCard from '../../components/public/CompanyCard'
import AnimatedBackground from '../../components/guide/AnimatedBackground'
import Reveal from '../../components/guide/Reveal'
import type { CompanyOffer } from '../../types'
import { getCareers } from '../../services/internships'

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
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[32px] p-10 text-white shadow-2xl border border-blue-600/30">
            <div className="flex items-center gap-4 mb-8 text-blue-200">
              <Info size={32} />
              <h2 className="text-3xl font-bold text-white tracking-tight">¿Cómo usar este directorio?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-bold text-blue-300 mb-2">Solicitudes Urgentes</h4>
                <p className="text-sm opacity-80 leading-relaxed">Empresas que requieren pasantes de inmediato. ¡Postúlate cuanto antes!</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-bold text-blue-300 mb-2">Solicitudes Directas</h4>
                <p className="text-sm opacity-80 leading-relaxed">Empresas activas con procesos de selección vigentes.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-bold text-blue-300 mb-2">Convenios Generales</h4>
                <p className="text-sm opacity-80 leading-relaxed">Convenios activos donde puedes probar suerte presentando tu carta.</p>
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
                    <div key={o.id} className="bg-white p-6 rounded-[24px] border border-red-100 shadow-md">
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
                  <div key={o.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
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
                    <div key={o.id} className="bg-slate-100 p-5 rounded-[20px] border">
                      <CompanyCard offer={o} isExpanded={expandedCompanyId === o.id} onToggle={(id: string) => setExpandedCompanyId(prev => prev === id ? null : id)} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <div className="sticky top-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl">
              <Award className="mb-4 opacity-50" size={48} />
              <h3 className="text-2xl font-bold mb-2">Casos de Éxito</h3>
              <p className="text-blue-100 text-sm mb-6">Historias de estudiantes que lograron su puesto ideal.</p>
              <Link to="/student/success-stories" className="block w-full bg-white text-blue-700 py-4 rounded-xl font-bold text-center hover:bg-blue-50 transition">Ver historias →</Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Home
