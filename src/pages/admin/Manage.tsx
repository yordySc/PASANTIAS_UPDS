import type { Dispatch, SetStateAction } from 'react'
import type { CompanyOffer } from '../../types'

interface ManageProps {
  offers: CompanyOffer[]
  setOffers: Dispatch<SetStateAction<CompanyOffer[]>>
}

function Manage({ offers, setOffers }: ManageProps) {
  const toggleVisibility = (id: number) => {
    setOffers((currentOffers) =>
      currentOffers.map((offer) =>
        offer.id === id ? { ...offer, visible: !offer.visible } : offer,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Gestión</p>
        <h2 className="text-3xl font-semibold text-slate-900">Administrar ofertas y cupos</h2>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{offer.institution}</h3>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${offer.visible ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {offer.visible ? 'Publicada' : 'Oculta'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{offer.address}</p>
                <p className="mt-3 text-sm text-slate-700">{offer.description}</p>
                <p className="mt-3 text-sm text-slate-500">Perfiles: {offer.careers.join(', ')}</p>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[220px]">
                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                  <p className="font-medium text-slate-700">Cupos</p>
                  <p>{offer.filled}/{offer.vacancies} ocupados</p>
                </div>
                <button
                  onClick={() => toggleVisibility(offer.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${offer.visible ? 'bg-amber-600 text-white hover:bg-amber-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
                >
                  {offer.visible ? 'Ocultar publicación' : 'Volver a publicar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Manage
