import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CompanyCard from '../../components/public/CompanyCard'
import type { CompanyOffer } from '../../types'

interface HomeProps {
  offers: CompanyOffer[]
}

function Home({ offers }: HomeProps) {
  const [selectedCareer, setSelectedCareer] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeGroup, setActiveGroup] = useState<'all' | 'urgent' | 'general'>('all')
  const [expandedCompanyId, setExpandedCompanyId] = useState<number | null>(null)

  const careers = useMemo(() => {
    const values = offers.flatMap((offer) => offer.careers)
    return ['Todas', ...Array.from(new Set(values))]
  }, [offers])

  const filteredOffers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const nextOffers = offers.filter((offer) => {
      const matchesCareer = selectedCareer === 'Todas' || offer.careers.includes(selectedCareer)
      const matchesSearch = normalizedSearch.length === 0 || [
        offer.institution,
        offer.description,
        offer.address,
        ...offer.careers,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))

      return matchesCareer && matchesSearch
    })

    return [...nextOffers].sort((a, b) => {
      if (a.immediateAcceptance && !b.immediateAcceptance) return -1
      if (!a.immediateAcceptance && b.immediateAcceptance) return 1
      return Number(b.visible) - Number(a.visible)
    })
  }, [offers, searchTerm, selectedCareer])

  const activeOffers = filteredOffers.filter((offer) => offer.visible)
  const inactiveOffers = filteredOffers.filter((offer) => !offer.visible)
  const urgentOffers = activeOffers.filter((offer) => offer.immediateAcceptance)
  const regularActiveOffers = activeOffers.filter((offer) => !offer.immediateAcceptance)

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] px-5 py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_70%)]" />
        
        <div className="relative mx-auto max-w-5xl text-center lg:text-left">
          <div className="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-lg lg:mx-0">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
            </span>
            Oportunidades Actuales
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
            Encuentra tu pasantía ideal<br className="hidden sm:block" /> 
            y construye tu futuro profesional
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100 lg:mx-0">
            Explora vacantes reales. Prioriza las de <span className="font-semibold text-white">aceptación inmediata</span>.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            {['+20 Instituciones', 'Mapa Interactivo', 'Aceptación Inmediata'].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/15 px-6 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/25">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTROS - Sin sticky, más compacto */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar empresa, carrera o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex-1">
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {careers.map((career) => (
                  <option key={career} value={career}>{career}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todas' },
                { value: 'urgent', label: 'Urgentes' },
                { value: 'general', label: 'Generales' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveGroup(item.value as 'all' | 'urgent' | 'general')}
                  className={`rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeGroup === item.value
                      ? 'bg-[#1e40af] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal - Más espacio arriba */}
      <section className="mx-auto max-w-7xl px-5 pt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Lista de Ofertas */}
          <div className="space-y-12">
            <div>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">Requerimientos Vigentes</h2>
                <span className="text-slate-500 font-medium">{activeOffers.length} empresas</span>
              </div>

              {/* Urgentes */}
              {(activeGroup === 'all' || activeGroup === 'urgent') && (
                <div className="mb-12">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-bold text-white">ACEPTACIÓN INMEDIATA</div>
                    <span className="text-emerald-600 font-medium">{urgentOffers.length} ofertas</span>
                  </div>
                  <div className="space-y-6">
                    {urgentOffers.length > 0 ? (
                      urgentOffers.map((offer) => (
                        <CompanyCard
                          key={offer.id}
                          offer={offer}
                          isExpanded={expandedCompanyId === offer.id}
                          onToggle={(id) => setExpandedCompanyId(prev => prev === id ? null : id)}
                        />
                      ))
                    ) : (
                      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                        No hay ofertas urgentes en este momento.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Generales */}
              {(activeGroup === 'all' || activeGroup === 'general') && (
                <div>
                  <div className="mb-5 inline-block rounded-full bg-slate-200 px-6 py-2 text-sm font-semibold text-slate-700">OPCIONES GENERALES</div>
                  <div className="space-y-6">
                    {regularActiveOffers.length > 0 ? regularActiveOffers.map((offer) => (
                      <CompanyCard
                        key={offer.id}
                        offer={offer}
                        isExpanded={expandedCompanyId === offer.id}
                        onToggle={(id) => setExpandedCompanyId(prev => prev === id ? null : id)}
                      />
                    )) : (
                      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                        No hay ofertas generales para tu búsqueda.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* No Vigentes */}
            {inactiveOffers.length > 0 && (
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8">
                <h3 className="text-2xl font-semibold mb-2">Ofertas No Vigentes</h3>
                <p className="text-slate-600 mb-8">Instituciones con convenios anteriores</p>
                <div className="space-y-6">
                  {inactiveOffers.map((offer) => (
                    <CompanyCard
                      key={offer.id}
                      offer={offer}
                      isExpanded={expandedCompanyId === offer.id}
                      onToggle={(id) => setExpandedCompanyId(prev => prev === id ? null : id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:pt-4">
            <section className="rounded-3xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-8 text-white shadow-xl">
              <h3 className="uppercase tracking-widest text-sky-200 text-sm font-semibold">Casos de Éxito</h3>
              <h4 className="text-2xl font-bold mt-3 leading-tight">De pasantía a empleo real</h4>
              <p className="mt-5 text-sky-100 text-[15px]">
                Estudiantes que fueron contratados por las mismas empresas donde realizaron su pasantía.
              </p>
              <Link
                to="/student/success-stories"
                className="mt-7 inline-block rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-[#1e40af] hover:scale-105 active:scale-95 transition-all"
              >
                Ver todas las historias →
              </Link>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow">
              <h3 className="font-semibold text-xl">En cada perfil encontrarás</h3>
              <ul className="mt-7 space-y-5 text-sm">
                {[
                  "Logo y descripción completa",
                  "Carreras solicitadas",
                  "Cupos disponibles",
                  "Mapa de Google integrado"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home