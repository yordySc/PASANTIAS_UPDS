import type { CompanyOffer } from '../../types'

interface CompanyCardProps {
  offer: CompanyOffer
  isExpanded: boolean
  onToggle: (id: number) => void
}

function CompanyCard({ offer, isExpanded, onToggle }: CompanyCardProps) {
  const isFull = offer.filled >= offer.vacancies
  const availableSpots = Math.max(0, offer.vacancies - offer.filled)

  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_22px_60px_-28px_rgba(34,59,135,0.45)] sm:rounded-[28px]">
      <div className="bg-gradient-to-r from-[#223b87] via-[#1d3b8c] to-[#0085fc] p-4 text-white sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-100 sm:text-xs">{offer.type}</p>
            <h3 className="mt-2 text-lg font-semibold sm:text-xl">{offer.institution}</h3>
            <p className="mt-2 text-sm text-sky-100">{offer.address}</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-base font-semibold backdrop-blur sm:h-14 sm:w-14 sm:text-lg">
            {offer.logo}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-sm leading-7 text-slate-700">{offer.description}</p>

        <div className="flex flex-wrap gap-2">
          {offer.careers.map((career) => (
            <span key={career} className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-[#0085fc]">
              {career}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-900">{availableSpots} cupos disponibles</p>
            <p>{offer.filled}/{offer.vacancies} asignados</p>
          </div>
          <div className="flex gap-2">
            {offer.immediateAcceptance && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">Aceptación inmediata</span>
            )}
            <span className={`rounded-full px-3 py-1 font-semibold ${isFull ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-[#223b87]'}`}>
              {isFull ? 'Completo' : 'Disponible'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onToggle(offer.id)}
          className="w-full rounded-full bg-[#223b87] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2f6d] sm:w-auto"
        >
          {isExpanded ? 'Ocultar detalles' : 'Ver más'}
        </button>

        {isExpanded && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Perfil que buscan</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {offer.institution} está buscando estudiantes de {offer.careers.join(', ')} para fortalecer el equipo con responsabilidad y compromiso.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {offer.careers.map((career) => (
                  <span key={career} className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-[#223b87]">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Cupos disponibles</p>
                <p className="mt-2 text-3xl font-semibold text-[#223b87]">{availableSpots}</p>
                <p className="mt-1 text-sm text-slate-600">{offer.filled}/{offer.vacancies} cupos asignados</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Ubicación</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{offer.address}</p>
                <p className="mt-2 text-sm text-slate-500">Mapa de Google con la dirección registrada para facilitar la visita o el contacto.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-2">
              <iframe
                title={`Mapa de ${offer.institution}`}
                src={offer.mapUrl}
                className="h-56 w-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default CompanyCard
