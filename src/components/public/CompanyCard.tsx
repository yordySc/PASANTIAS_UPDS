import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import type { CompanyOffer } from '../../types'
import imagenEmpresaPredeterminada from '../../assets/imagen1UPDS.jpg'

interface CompanyCardProps {
  offer: CompanyOffer
  isExpanded: boolean
  onToggle: (id: string) => void
}

function CompanyCard({ offer, isExpanded, onToggle }: CompanyCardProps) {
  const isFull = offer.filled >= offer.vacancies
  const logoSrc = offer.logo?.startsWith('http') ? offer.logo : imagenEmpresaPredeterminada
  const hasMapUrl = Boolean(offer.mapUrl?.trim())
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
      className="group relative w-full min-w-0 overflow-hidden rounded-[24px] border border-[#2967CD]/20 bg-white shadow-[0_16px_42px_-30px_rgba(0,142,196,0.32)] transition-shadow duration-300 hover:shadow-[0_22px_50px_-28px_rgba(0,142,196,0.45)]"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-[#2967CD]" />
      <div className="relative space-y-4 p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2967CD]/20 bg-[#2967CD]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#003366]">
              <Sparkles size={12} />
              {offer.type}
            </div>
            <div>
              <h3 className="line-clamp-2 break-words text-lg font-bold tracking-tight text-[#003366] sm:text-xl">{offer.institution}</h3>
              <p className="mt-2 flex min-w-0 items-start gap-2 text-sm text-slate-500">
                <MapPin size={15} className="shrink-0 text-[#2967CD]" />
                <span className="break-words">{offer.address}</span>
              </p>
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#2967CD]/20 bg-[#2967CD]/[0.06] text-lg font-semibold text-[#003366]">
            <img src={logoSrc} alt={offer.logo ? `Logo de ${offer.institution}` : `Imagen referencial de ${offer.institution}`} className="h-full w-full object-contain p-1.5" />
          </div>
        </div>

        <div className="border-y border-slate-100 py-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Carreras solicitadas</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {offer.careers.length ? offer.careers.map((career) => (
              <span key={career} className="shrink-0 rounded-full border border-[#2967CD]/15 bg-[#2967CD]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#003366]">
                {career}
              </span>
            )) : <span className="text-xs text-slate-500">No se especificaron carreras.</span>}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Disponibilidad</p>
            <p className={`mt-0.5 flex items-center gap-2 text-sm font-black ${isFull ? 'text-rose-700' : 'text-emerald-700'}`}><span className={`h-2.5 w-2.5 rounded-full ${isFull ? 'bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.14)]' : 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.16)]'}`} />{isFull ? 'Sin cupos' : 'Hay cupos'}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {offer.immediateAcceptance && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Aceptación inmediata</span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isFull ? 'bg-amber-100 text-amber-700' : 'bg-[#2967CD]/10 text-[#003366]'}`}>
            {isFull ? 'Completo' : 'Disponible'}
          </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Consulta los detalles para postular.</p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onToggle(offer.id)}
            aria-expanded={isExpanded}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2967CD] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,142,196,0.9)] transition-colors hover:bg-[#003366] sm:w-auto"
          >
            {isExpanded ? 'Ocultar' : 'Ver más'} <ArrowRight size={16} />
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-[20px] bg-white p-4">
                  {offer.description && <><p className="text-sm font-semibold text-[#003366]">Sobre la oportunidad</p><p className="mt-2 text-sm leading-7 text-slate-600">{offer.description}</p><div className="my-4 h-px bg-slate-100" /></>}
                  <p className="text-sm font-semibold text-[#003366]">Perfil que buscan</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {offer.institution} está buscando estudiantes de {offer.careers.length ? offer.careers.join(', ') : 'diversas carreras'} para participar en prácticas profesionales con compromiso, aprendizaje y trabajo en equipo.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[20px] bg-white p-4">
                    <p className="text-sm font-semibold text-[#003366]">Disponibilidad</p>
                    <p className={`mt-2 flex items-center gap-2 text-lg font-bold ${isFull ? 'text-rose-700' : 'text-emerald-700'}`}><span className={`h-2.5 w-2.5 rounded-full ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`} />{isFull ? 'Sin cupos disponibles' : 'Hay cupos disponibles'}</p>
                    <p className="mt-1 text-sm text-slate-600">Confirma los requisitos antes de postular.</p>
                  </div>
                  <div className="rounded-[20px] bg-white p-4">
                    <p className="text-sm font-semibold text-[#003366]">Ubicación</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{offer.address}</p>
                    <p className="mt-2 text-sm text-slate-500">Mapa de Google con la dirección registrada para facilitar la visita o el contacto.</p>
                  </div>
                </div>

                <div className="rounded-[20px] border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-[#003366]">Ubicación de la empresa</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{offer.address}</p>
                  <div className={`mt-3 rounded-[20px] border p-5 text-center ${hasMapUrl ? 'border-[#b9d8f4] bg-gradient-to-br from-[#e8f4ff] via-white to-[#dbeeff]' : 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50'}`}>
                    <MapPin className={`mx-auto ${hasMapUrl ? 'text-[#2967CD]' : 'text-amber-500'}`} size={28} />
                    <p className="mt-2 font-semibold text-[#003366]">{hasMapUrl ? 'Ubicación disponible en Google Maps' : 'Ubicación sin enlace de Google Maps'}</p>
                    <p className="mt-1 text-sm text-slate-600">{hasMapUrl ? 'Consulta la dirección completa y planifica tu visita desde el mapa.' : 'Esta empresa aún no proporcionó un enlace de ubicación. Usa la dirección registrada para comunicarte o visitarla.'}</p>
                  </div>
                  {hasMapUrl && <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#003366] to-[#2967CD] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_-14px_rgba(0,51,102,0.9)] transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Ver en Google Maps
                  </a>}
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
