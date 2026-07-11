import type { CompanyOffer } from '../../types'

interface DashboardProps {
  offers: CompanyOffer[]
}

function Dashboard({ offers }: DashboardProps) {
  const visibleOffers = offers.filter((offer) => offer.visible)
  const filledOffers = offers.filter((offer) => !offer.visible || offer.filled >= offer.vacancies)
  const totalVacancies = offers.reduce((sum, offer) => sum + offer.vacancies, 0)
  const openVacancies = offers.reduce((sum, offer) => sum + Math.max(offer.vacancies - offer.filled, 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Dashboard</p>
        <h2 className="text-3xl font-semibold text-slate-900">Resumen de prácticas y cupos</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Ofertas publicadas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{visibleOffers.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Cupos abiertos</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{openVacancies}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Solicitudes cerradas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{filledOffers.length}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Estado general</h3>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">{offers.length} registros</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">{offer.institution}</h4>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${offer.visible ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {offer.visible ? 'Visible' : 'Oculta'}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{offer.careers.join(', ')}</p>
              <p className="mt-2 text-sm text-slate-500">{offer.filled}/{offer.vacancies} cupos ocupados</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
