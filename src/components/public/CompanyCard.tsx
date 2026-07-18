import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import type { CompanyOffer } from '../../types'

interface CompanyCardProps {
  offer: CompanyOffer
  isExpanded: boolean
  onToggle: (id: string) => void
}

function CompanyCard({ offer, isExpanded, onToggle }: CompanyCardProps) {
  const isFull = offer.filled >= offer.vacancies
  const availableSpots = Math.max(0, offer.vacancies - offer.filled)
  const mapHref = (() => {
    const raw = offer.mapUrl?.trim()
    if (!raw) return `https://www.google.com/maps?q=${encodeURIComponent(offer.address)}`
    if (raw.includes('maps.google') || raw.includes('google.com/maps')) {
      return `https://www.google.com/maps?q=${encodeURIComponent(offer.address)}`
    }
    return raw
  })()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      className="group relative w-full min-w-0 overflow-hidden rounded-[30px] border border-[#008ec4]/20 bg-white shadow-[0_24px_70px_-34px_rgba(0,142,196,0.28)] transition-shadow duration-300 hover:shadow-[0_28px_80px_-34px_rgba(0,142,196,0.42)]"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-[#008ec4]" />
      <div className="relative space-y-5 p-5 pl-6 sm:p-7 sm:pl-8">
        <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#008ec4]/20 bg-[#008ec4]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0075a1]">
              <Sparkles size={12} />
              {offer.type}
            </div>
            <div>
              <h3 className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{offer.institution}</h3>
              <p className="mt-2 flex min-w-0 items-start gap-2 text-sm text-slate-500">
                <MapPin size={15} className="shrink-0 text-[#008ec4]" />
                <span className="break-words">{offer.address}</span>
              </p>
            </div>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008ec4]/20 bg-[#008ec4]/[0.06] text-lg font-semibold text-[#0075a1] sm:h-16 sm:w-16">
            {offer.logo.startsWith('http') ? <img src={offer.logo} alt={`Logo de ${offer.institution}`} className="h-full w-full object-cover" /> : offer.logo}
          </div>
        </div>

        <div className="border-y border-slate-100 py-5">
          <p className="text-sm leading-7 text-slate-600">{offer.description}</p>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {offer.careers.map((career) => (
              <span key={career} className="shrink-0 rounded-full border border-[#008ec4]/15 bg-[#008ec4]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#0075a1]">
                {career}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Cupos disponibles</p>
            <p className="mt-1 text-2xl font-black tracking-tight text-[#0075a1]">{availableSpots} <span className="text-sm font-bold">cupos</span></p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
          {offer.immediateAcceptance && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Aceptación inmediata</span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isFull ? 'bg-amber-100 text-amber-700' : 'bg-[#008ec4]/10 text-[#0075a1]'}`}>
            {isFull ? 'Completo' : 'Disponible'}
          </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">{offer.filled}/{offer.vacancies} cupos asignados</p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onToggle(offer.id)}
            aria-expanded={isExpanded}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#008ec4] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,142,196,0.9)] transition-colors hover:bg-[#0075a1] sm:w-auto"
          >
            {isExpanded ? 'Ocultar' : 'Ver más'} <ArrowRight size={16} />
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-[20px] bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Perfil que buscan</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {offer.institution} está buscando estudiantes de {offer.careers.length ? offer.careers.join(', ') : 'diversas carreras'} para participar en prácticas profesionales con compromiso, aprendizaje y trabajo en equipo.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[20px] bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">Cupos disponibles</p>
                    <p className="mt-2 text-3xl font-semibold text-[#223b87]">{availableSpots}</p>
                    <p className="mt-1 text-sm text-slate-600">{offer.filled}/{offer.vacancies} cupos asignados</p>
                  </div>
                  <div className="rounded-[20px] bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">Ubicación</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{offer.address}</p>
                    <p className="mt-2 text-sm text-slate-500">Mapa de Google con la dirección registrada para facilitar la visita o el contacto.</p>
                  </div>
                </div>

                <div className="rounded-[20px] border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Ubicación de la empresa</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{offer.address}</p>
                  <div className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100">
                    <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 p-4 text-center text-sm text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-900">Mapa de {offer.institution}</p>
                        <p className="mt-2">La ubicación se abrirá en Google Maps al hacer clic en el botón.</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center rounded-full bg-[#223b87] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default CompanyCard
