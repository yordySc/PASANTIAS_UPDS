import { useEffect, useMemo, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { BriefcaseBusiness, Sparkles, PlusCircle, Trash2, PencilLine, BadgeCheck, CircleAlert } from 'lucide-react'
import type { Career, CompanyOffer } from '../../types'
import { isSupabaseConfigured } from '../../lib/supabase'
import { deleteOffer, getCareers, saveOffer, uploadLogo } from '../../services/internships'

interface ManageProps {
  offers: CompanyOffer[]
  setOffers: Dispatch<SetStateAction<CompanyOffer[]>>
  refreshOffers: () => Promise<void>
}

const blank = (): Omit<CompanyOffer, 'id' | 'companyId'> => {
  const defaultExpiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  return { institution: '', address: '', careers: [], vacancies: 1, filled: 0, visible: true, type: 'Pasantía vigente', description: '', logo: '', status: 'vigente', immediateAcceptance: false, mapUrl: '', expiresAt: defaultExpiresAt }
}

function Manage({ offers, setOffers, refreshOffers }: ManageProps) {
  const [draft, setDraft] = useState(blank)
  const [editing, setEditing] = useState<CompanyOffer | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [careers, setCareers] = useState<Career[]>([])
  const [loadingCareers, setLoadingCareers] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const close = (nextMessage = '') => { setDraft(blank()); setEditing(null); setLogoFile(null); setShowForm(false); setMessage(nextMessage) }
  const handleClose = () => { close() }
  const expired = (offer: CompanyOffer) => Boolean(offer.expiresAt && new Date(`${offer.expiresAt}T23:59:59`) < new Date()) || offer.filled >= offer.vacancies
  const edit = (offer: CompanyOffer) => { const { id: _id, companyId: _companyId, ...data } = offer; setDraft({ ...data, careers: offer.careers }); setEditing(offer); setShowForm(true) }

  useEffect(() => {
    const loadCareers = async () => {
      if (!isSupabaseConfigured) return
      try {
        setLoadingCareers(true)
        setCareers(await getCareers())
      } catch {
        setCareers([])
      } finally {
        setLoadingCareers(false)
      }
    }
    void loadCareers()
  }, [])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setMessage('')
    const careersList = draft.careers.map((value) => value.trim()).filter(Boolean)

    if (!draft.institution.trim() || !draft.address.trim() || !draft.mapUrl.trim() || !draft.description.trim() || !careersList.length) {
      setMessage('Completa los campos obligatorios y selecciona al menos una carrera.')
      setSaving(false)
      return
    }

    if (!logoFile && !draft.logo && !editing) {
      setMessage('Selecciona un logo para la empresa antes de guardar.')
      setSaving(false)
      return
    }

    try {
      const logo = logoFile && isSupabaseConfigured ? await uploadLogo(logoFile) : draft.logo
      const expiresAt = draft.expiresAt || new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      const data = { ...draft, logo: logo || draft.logo, careers: careersList, status: 'vigente' as const, expiresAt }
      const nextOffer = { ...data, id: editing?.id || crypto.randomUUID(), companyId: editing?.companyId }

      if (isSupabaseConfigured) {
        await saveOffer(data, editing || undefined)
        await refreshOffers()
      } else if (editing) {
        setOffers((all) => all.map((offer) => offer.id === editing.id ? nextOffer : offer))
      } else {
        setOffers((all) => [...all, nextOffer])
      }

      close('Oferta guardada correctamente.')
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo guardar la oferta.') }
    finally { setSaving(false) }
  }

  const remove = async (offer: CompanyOffer) => {
    if (!window.confirm('¿Eliminar esta oferta?')) return
    try { if (isSupabaseConfigured && !offer.id.startsWith('mock-')) { await deleteOffer(offer.id); await refreshOffers() } else setOffers((all) => all.filter((item) => item.id !== offer.id)) }
    catch { setMessage('No se pudo eliminar la oferta.') }
  }



  const toggleCareer = (careerName: string) => {
    setDraft((current) => ({
      ...current,
      careers: current.careers.includes(careerName)
        ? current.careers.filter((item) => item !== careerName)
        : [...current.careers, careerName],
    }))
  }


  const stats = useMemo(() => ({
    publicadas: offers.filter((offer) => offer.visible).length,
    disponibles: offers.filter((offer) => offer.visible && offer.filled < offer.vacancies).length,
    cerradas: offers.filter((offer) => !offer.visible || offer.filled >= offer.vacancies).length,
  }), [offers])

  const filteredOffers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return offers
    return offers.filter((offer) => [offer.institution, offer.address, offer.description, offer.type, offer.careers.join(' '), offer.logo].some((value) => value.toLowerCase().includes(query)))
  }, [offers, searchTerm])

  return <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#223b87] via-[#1d3b8c] to-[#0085fc] p-6 text-white shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">Panel administrativo</p>
          <h2 className="mt-2 text-3xl font-semibold">Gestiona empresas, carreras y vacantes</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-sky-100">Cada carrera que registres se mostrará en el filtro del home para que los estudiantes encuentren más rápido las oportunidades.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#223b87] transition hover:scale-[1.01]">
          <PlusCircle size={18} /> Nueva empresa / oferta
        </button>
      </div>
    </motion.div>

    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-[#0085fc]"><BriefcaseBusiness size={18} /> <span className="text-sm font-semibold">Publicadas</span></div><p className="mt-4 text-3xl font-semibold text-slate-900">{stats.publicadas}</p></div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-emerald-600"><BadgeCheck size={18} /> <span className="text-sm font-semibold">Disponibles</span></div><p className="mt-4 text-3xl font-semibold text-slate-900">{stats.disponibles}</p></div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-amber-600"><Sparkles size={18} /> <span className="text-sm font-semibold">Cerradas</span></div><p className="mt-4 text-3xl font-semibold text-slate-900">{stats.cerradas}</p></div>
    </div>

    {message && <p className="rounded-[20px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}

    {/* Antes este contenedor estaba dentro de un grid xl:grid-cols-[1.1fr_0.9fr] con una
        segunda columna vacía, lo que comprimía el formulario. Ahora ocupa el 100% del ancho. */}
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><div><h3 className="text-xl font-semibold text-slate-900">Ofertas registradas</h3><p className="mt-1 text-sm text-slate-600">Administra el estado, vacantes y visibilidad de cada oportunidad con un flujo simple y claro.</p></div></div>
      {showForm && <form onSubmit={submit} className="mt-6 w-full space-y-6 rounded-[30px] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 shadow-inner lg:p-10">
        <div className="flex items-start gap-3 rounded-[22px] border border-sky-100 bg-white/90 p-5">
          <CircleAlert className="mt-0.5 text-[#0085fc]" size={18} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{editing ? 'Edita la oportunidad' : 'Crea una nueva oportunidad'}</p>
            <p className="text-sm text-slate-600">Completa cada campo con información clara para que los estudiantes entiendan rápidamente qué empresa ofrece y a qué carrera está dirigida.</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#223b87]">Campos obligatorios: nombre de la empresa, tipo, dirección, mapa, logo, descripción y al menos una carrera.</p>
          </div>
        </div>
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre de la empresa" value={draft.institution} change={(value) => setDraft({ ...draft, institution: value })} required placeholder="Ej. Banco del Estado" description="Escribe el nombre con el que aparecerá en el directorio." />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Tipo de oportunidad</span>
                <p className="mb-2 text-xs text-slate-500">Elige el formato que mejor represente la vacante.</p>
                <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} className="w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#0085fc]">
                  <option value="Pasantía vigente">Pasantía vigente</option>
                  <option value="Solicitudes Directas">Solicitudes Directas</option>
                  <option value="Convenios Generales">Convenios Generales</option>
                  <option value="Prácticas profesionales">Prácticas profesionales</option>
                </select>
              </label>
              <Field label="Dirección" value={draft.address} change={(value) => setDraft({ ...draft, address: value })} required placeholder="Ej. Av. América, zona El Alto" description="Agrega la ubicación donde se desarrolla la oportunidad." />
              <Field label="URL del mapa de Google" value={draft.mapUrl} change={(value) => setDraft({ ...draft, mapUrl: value })} required placeholder="https://maps.google.com/…" description="Pega el enlace embebido para mostrar la ubicación." />
            </div>
            <label className="rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Cargar logo</span>
              <p className="mb-2 text-xs text-slate-500">Sube una imagen para que la empresa se vea más profesional.</p>
              <input type="file" accept="image/*" required={!editing && !logoFile && !draft.logo} onChange={(event) => setLogoFile(event.target.files?.[0] || null)} className="w-full" />
            </label>
            <Field label="Descripción" value={draft.description} change={(value) => setDraft({ ...draft, description: value })} required placeholder="Describe la oportunidad, requisitos y lo que hace especial a la empresa." description="Esta información ayuda a que los estudiantes entiendan mejor la vacante." textarea />
          </div>
          <div className="space-y-6">
            <div className="rounded-[22px] border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-800">¿A qué carrera va dirigida?</p>
              <p className="mt-1 text-sm text-slate-500">Selecciona una o varias carreras según el perfil que necesita esta empresa.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {loadingCareers ? <p className="text-sm text-slate-500">Cargando carreras…</p> : careers.length ? careers.map((career) => (
                  <label key={career.id} className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm ${draft.careers.includes(career.name) ? 'border-[#223b87] bg-[#223b87] text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    <input type="checkbox" checked={draft.careers.includes(career.name)} onChange={() => toggleCareer(career.name)} className="h-4 w-4 rounded border-slate-300 text-[#223b87] focus:ring-[#223b87]" />
                    {career.name}
                  </label>
                )) : <p className="text-sm text-slate-500">Aún no hay carreras creadas. Puedes agregarlas en la columna de la derecha.</p>}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
              <Field label="Cupos totales" type="number" value={String(draft.vacancies)} change={(value) => setDraft({ ...draft, vacancies: Number(value) })} required />
              <Field label="Cupos ocupados" type="number" value={String(draft.filled)} change={(value) => setDraft({ ...draft, filled: Number(value) })} required />
            </div>
            <div className="space-y-3 rounded-[22px] border border-slate-200 bg-white p-5">
              <label className="flex items-center gap-3 rounded-[16px] bg-slate-50 px-3 py-3 text-sm text-slate-700"><input type="checkbox" checked={draft.immediateAcceptance} onChange={(event) => setDraft({ ...draft, immediateAcceptance: event.target.checked })} className="h-4 w-4 rounded border-slate-300 text-[#223b87] focus:ring-[#223b87]" />Aceptación inmediata</label>
              <label className="flex items-center gap-3 rounded-[16px] bg-slate-50 px-3 py-3 text-sm text-slate-700"><input type="checkbox" checked={draft.visible} onChange={(event) => setDraft({ ...draft, visible: event.target.checked })} className="h-4 w-4 rounded border-slate-300 text-[#223b87] focus:ring-[#223b87]" />Mostrar en la web</label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={handleClose} className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancelar</button><button disabled={saving} type="submit" className="rounded-full bg-[#223b87] px-5 py-2.5 text-sm font-semibold text-white">{saving ? 'Guardando…' : 'Guardar oferta'}</button></div>
      </form>}

      <div className="mt-5 rounded-[20px] border border-slate-200 bg-white p-4">
        <label className="block text-sm font-semibold text-slate-700">Buscar empresa u oferta</label>
        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busca por nombre, carrera, tipo o dirección" className="mt-2 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">{filteredOffers.length ? filteredOffers.map((offer) => <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={offer.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h4 className="text-lg font-semibold text-slate-900">{offer.institution}</h4>
            <p className="mt-2 text-sm text-slate-600">{offer.careers.join(', ')} · {offer.filled}/{offer.vacancies} cupos · {offer.type}</p>
            <p className="mt-3 text-sm"><span className={`rounded-full px-3 py-1 ${expired(offer) ? 'bg-amber-100 text-amber-700' : offer.visible ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{expired(offer) ? 'Fuera de vigencia' : offer.visible ? 'Publicada' : 'Oculta'}</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => edit(offer)} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><PencilLine size={16} /> Editar</button>
            <button onClick={() => remove(offer)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-700"><Trash2 size={16} /> Eliminar</button>
          </div>
        </div>
      </motion.article>) : <p className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600 lg:col-span-2">No se encontraron empresas con ese criterio.</p>}</div>
    </div>
  </div>
}

function Field({ label, value, change, type = 'text', required = false, placeholder, description, textarea = false }: { label: string; value: string; change: (value: string) => void; type?: string; required?: boolean; placeholder?: string; description?: string; textarea?: boolean }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>{description && <p className="mb-2 text-xs text-slate-500">{description}</p>}{textarea ? <textarea required={required} value={value} onChange={(event) => change(event.target.value)} placeholder={placeholder} className="min-h-[130px] w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0085fc]" /> : <input required={required} type={type} min={type === 'number' ? '0' : undefined} value={value} onChange={(event) => change(event.target.value)} placeholder={placeholder} className="w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#0085fc]" />}</label>
}
export default Manage