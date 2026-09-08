import { useEffect, useMemo, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { BriefcaseBusiness, Sparkles, PlusCircle, Trash2, PencilLine, BadgeCheck, CircleAlert, ImagePlus, FileText, ChevronDown, ChevronLeft, ChevronRight, LockKeyhole, CalendarDays, UsersRound } from 'lucide-react'
import type { Career, CompanyOffer } from '../../types'
import { isSupabaseConfigured } from '../../lib/supabase'
import { deleteOffer, getCareers, getCompanyAdminDetails, saveOffer, uploadLogo } from '../../services/internships'
import imagenEmpresaPredeterminada from '../../assets/imagen1UPDS.jpg'

interface ManageProps {
  offers: CompanyOffer[]
  setOffers: Dispatch<SetStateAction<CompanyOffer[]>>
  refreshOffers: () => Promise<void>
}

const blank = (): Omit<CompanyOffer, 'id' | 'companyId'> => {
  const defaultExpiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  return { institution: '', address: '', careers: [], vacancies: 1, filled: 0, visible: true, type: 'Solicitud activa', description: '', logo: '', status: 'vigente', immediateAcceptance: false, mapUrl: '', expiresAt: defaultExpiresAt }
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
  const [offerFilter, setOfferFilter] = useState<'all' | 'active' | 'agreement'>('all')
  const formRef = useRef<HTMLFormElement>(null)

  const close = (nextMessage = '') => { setDraft(blank()); setEditing(null); setLogoFile(null); setShowForm(false); setMessage(nextMessage) }
  const handleClose = () => { close() }
  const expired = (offer: CompanyOffer) => Boolean(offer.expiresAt && new Date(`${offer.expiresAt}T23:59:59`) < new Date()) || offer.filled >= offer.vacancies
  const create = () => { setDraft(blank()); setEditing(null); setLogoFile(null); setShowForm(true) }
  const edit = async (offer: CompanyOffer) => {
    const { id: _id, companyId: _companyId, ...data } = offer
    setDraft({ ...data, careers: offer.careers })
    setEditing(offer)
    setShowForm(true)
    if (!isSupabaseConfigured || !offer.companyId) return
    try {
      const details = await getCompanyAdminDetails(offer.companyId)
      setDraft((current) => ({ ...current, ...details }))
    } catch (error) {
      setMessage(error instanceof Error ? `No se pudieron cargar los datos internos: ${error.message}` : 'No se pudieron cargar los datos internos.')
    }
  }

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

  useEffect(() => {
    if (!showForm) return
    const frame = window.requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => window.cancelAnimationFrame(frame)
  }, [showForm])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setMessage('')
    const careersList = draft.careers.map((value) => value.trim()).filter(Boolean)

    if (!draft.institution.trim() || !draft.address.trim() || !careersList.length) {
      setMessage('Completa los campos obligatorios y selecciona al menos una carrera.')
      setSaving(false)
      return
    }

    if (draft.vacancies < 1 || draft.filled < 0 || draft.filled > draft.vacancies) {
      setMessage('Los cupos totales deben ser al menos 1, y los ocupados no pueden superar el total.')
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
    return offers.filter((offer) => {
      const matchesSearch = !query || [offer.institution, offer.address, offer.description, offer.type, offer.careers.join(' '), offer.logo].some((value) => value.toLowerCase().includes(query))
      const isAgreement = offer.type.toLowerCase().includes('convenio')
      const matchesFilter = offerFilter === 'all' || (offerFilter === 'agreement' ? isAgreement : !isAgreement)
      return matchesSearch && matchesFilter
    })
  }, [offers, searchTerm, offerFilter])

  return <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#003366] via-[#1d3b8c] to-[#2967CD] p-6 text-white shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">Panel administrativo</p>
          <h2 className="mt-2 text-3xl font-semibold">Gestiona empresas, carreras y vacantes</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-sky-100">Aquí encontrarás todo lo necesario para actualizar las ofertas que ven los estudiantes, organizar las carreras y controlar los cupos disponibles de forma sencilla.</p>
        </div>
        <button onClick={create} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#003366] transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <PlusCircle size={18} /> Nueva empresa / oferta
        </button>
      </div>
    </motion.div>

    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-[#2967CD]"><BriefcaseBusiness size={18} /> <span className="text-sm font-semibold">Publicadas</span></div><p className="mt-4 text-3xl font-semibold text-[#003366]">{stats.publicadas}</p></div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-emerald-600"><BadgeCheck size={18} /> <span className="text-sm font-semibold">Disponibles</span></div><p className="mt-4 text-3xl font-semibold text-[#003366]">{stats.disponibles}</p></div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-amber-600"><Sparkles size={18} /> <span className="text-sm font-semibold">Cerradas</span></div><p className="mt-4 text-3xl font-semibold text-[#003366]">{stats.cerradas}</p></div>
    </div>

    {message && <p className="rounded-[20px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}

    {/* Antes este contenedor estaba dentro de un grid xl:grid-cols-[1.1fr_0.9fr] con una
        segunda columna vacía, lo que comprimía el formulario. Ahora ocupa el 100% del ancho. */}
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><div><h3 className="text-xl font-semibold text-[#003366]">Ofertas registradas</h3><p className="mt-1 text-sm text-slate-600">Administra el estado, vacantes y visibilidad de cada oportunidad con un flujo simple y claro.</p></div></div>
      {showForm && <form ref={formRef} onSubmit={submit} className="mt-6 w-full scroll-mt-8 space-y-6 rounded-[30px] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 shadow-inner lg:p-10">
        <div className="flex items-start gap-3 rounded-[22px] border border-sky-100 bg-white/90 p-5">
          <CircleAlert className="mt-0.5 text-[#2967CD]" size={18} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{editing ? 'Edita la oportunidad' : 'Crea una nueva oportunidad'}</p>
            <p className="text-sm text-slate-600">Completa cada campo con información clara para que los estudiantes entiendan rápidamente qué empresa ofrece y a qué carrera está dirigida.</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#003366]">Obligatorios: nombre de la empresa, dirección, cupos y al menos una carrera. El resto se puede completar después.</p>
          </div>
        </div>
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre de la empresa" value={draft.institution} change={(value) => setDraft({ ...draft, institution: value })} required placeholder="Ej. Banco del Estado" description="Escribe el nombre con el que aparecerá en el directorio." />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Tipo de oportunidad</span>
                <p className="mb-2 text-xs text-slate-500">Elige el formato que mejor represente la vacante.</p>
                <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} className="w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#2967CD]">
                  <option value="Solicitud activa">Solicitud activa</option>
                  <option value="Empresa con convenio">Empresa con convenio</option>
                </select>
              </label>
              <Field label="Dirección" value={draft.address} change={(value) => setDraft({ ...draft, address: value })} required placeholder="Ej. Av. América, zona El Alto" description="Agrega la ubicación donde se desarrolla la oportunidad." />
              <Field label="Enlace de Google Maps (opcional)" value={draft.mapUrl} change={(value) => setDraft({ ...draft, mapUrl: value })} placeholder="https://maps.google.com/..." description="Puedes pegar un enlace o dejarlo vacío: la dirección escrita se usará para abrir el mapa." />
            </div>
            <label className="group flex cursor-pointer items-center gap-4 rounded-[20px] border border-dashed border-sky-300 bg-sky-50/60 p-4 text-sm text-slate-700 transition hover:border-[#2967CD] hover:bg-sky-50">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2967CD] text-white shadow-sm"><ImagePlus size={22} /></span>
              <span className="min-w-0"><span className="block font-semibold text-slate-800">Logo de la empresa <span className="font-medium text-slate-500">(opcional)</span></span><span className="mt-1 block text-xs text-slate-500">Haz clic para cargar una imagen. Formatos: PNG, JPG o WEBP.</span><span className="mt-2 block truncate text-xs font-semibold text-[#003366]">{logoFile?.name || (draft.logo ? 'Logo actual disponible' : 'Ningún archivo seleccionado')}</span></span>
              <input type="file" accept="image/*" onChange={(event) => setLogoFile(event.target.files?.[0] || null)} className="sr-only" />
            </label>
            <Field label="Descripción (opcional)" value={draft.description} change={(value) => setDraft({ ...draft, description: value })} placeholder="Describe la oportunidad, requisitos y lo que hace especial a la empresa." description="Puedes completar este campo después; una descripción ayuda a los estudiantes a decidir." textarea />
          </div>
          <div className="space-y-6">
            <div className="rounded-[22px] border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-800">¿A qué carrera va dirigida?</p>
              <p className="mt-1 text-sm text-slate-500">Selecciona una o varias carreras según el perfil que necesita esta empresa.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {loadingCareers ? <p className="text-sm text-slate-500">Cargando carreras…</p> : careers.length ? careers.map((career) => (
                  <label key={career.id} className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm ${draft.careers.includes(career.name) ? 'border-[#003366] bg-[#003366] text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    <input type="checkbox" checked={draft.careers.includes(career.name)} onChange={() => toggleCareer(career.name)} className="h-4 w-4 rounded border-slate-300 text-[#003366] focus:ring-[#003366]" />
                    {career.name}
                  </label>
                )) : <p className="text-sm text-slate-500">Aún no hay carreras creadas. Puedes agregarlas en la columna de la derecha.</p>}
              </div>
            </div>
            <div className="rounded-[22px] border border-[#b9d8f4] bg-gradient-to-br from-[#edf7ff] to-white p-5 shadow-[inset_4px_4px_10px_rgba(0,51,102,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div><p className="text-sm font-bold text-[#003366]">Control de cupos</p><p className="mt-1 text-xs text-slate-500">Define libremente el total. Los ocupados no pueden superar esa cantidad.</p></div>
                <span className="rounded-full bg-[#003366] px-3 py-1 text-xs font-bold text-white">{draft.vacancies - draft.filled} libres</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cupos totales" type="number" value={String(draft.vacancies)} change={(value) => { const vacancies = Math.max(1, Number(value) || 1); setDraft({ ...draft, vacancies, filled: Math.min(draft.filled, vacancies) }) }} required description="Indica la cantidad total disponible." />
                <Field label="Cupos ocupados" type="number" value={String(draft.filled)} change={(value) => setDraft({ ...draft, filled: Math.min(draft.vacancies, Math.max(0, Number(value) || 0)) })} required max={String(draft.vacancies)} description={`Entre 0 y ${draft.vacancies}.`} />
              </div>
            </div>
            <div className="space-y-3 rounded-[22px] border border-slate-200 bg-white p-5">
              <label className="flex items-center gap-3 rounded-[16px] bg-slate-50 px-3 py-3 text-sm text-slate-700"><input type="checkbox" checked={draft.visible} onChange={(event) => setDraft({ ...draft, visible: event.target.checked })} className="h-4 w-4 rounded border-slate-300 text-[#003366] focus:ring-[#003366]" />Mostrar en la web</label>
            </div>
            <details className="group rounded-[22px] border border-violet-200 bg-violet-50/70 p-5">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl p-2 text-sm font-bold text-[#003366] transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2967CD]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#003366] text-white"><LockKeyhole size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block">Datos internos de convenio</span><span className="mt-0.5 block text-xs font-medium text-slate-600">Haz clic aquí para abrir los campos privados del convenio.</span></span>
                <ChevronDown aria-hidden="true" size={20} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-xs leading-5 text-slate-600">Estos datos no se muestran a estudiantes ni forman parte del directorio público.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DateField label="Fecha de firma del convenio" value={draft.agreementSignedAt || ''} onChange={(value) => setDraft({ ...draft, agreementSignedAt: value })} description="Déjalo vacío si aún no existe convenio." />
                <DateField label="Vigente hasta" value={draft.agreementValidUntil || ''} onChange={(value) => setDraft({ ...draft, agreementValidUntil: value })} minDate={draft.agreementSignedAt} description="Fecha de término o renovación del convenio." />
              </div>
              <div className="mt-4"><Field label="Números de referencia" value={draft.referenceNumbers || ''} change={(value) => setDraft({ ...draft, referenceNumbers: value })} placeholder="Ej. Convenio N.º 014/2026 · Ref. RRHH-32" description="Registra códigos, números de expediente o referencias internas." textarea /></div>
            </details>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={handleClose} className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancelar</button><button disabled={saving} type="submit" className="rounded-full bg-[#003366] px-5 py-2.5 text-sm font-semibold text-white">{saving ? 'Guardando…' : 'Guardar oferta'}</button></div>
      </form>}

      <div className="mt-5 rounded-[20px] border border-slate-200 bg-white p-4">
        <label className="block text-sm font-semibold text-slate-700">Buscar empresa u oferta</label>
        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busca por nombre, carrera, tipo o dirección" className="mt-2 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#2967CD]" />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-[#003366]">Vista rápida de empresas</p><p className="text-xs text-slate-500">{filteredOffers.length} de {offers.length} empresas mostradas</p></div><div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar empresas">{[{ id: 'all', label: 'Todas' }, { id: 'active', label: 'Solicitudes activas' }, { id: 'agreement', label: 'Con convenio' }].map((filter) => <button key={filter.id} type="button" onClick={() => setOfferFilter(filter.id as 'all' | 'active' | 'agreement')} className={`min-h-10 rounded-full px-4 py-2 text-xs font-bold transition ${offerFilter === filter.id ? 'bg-[#003366] text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:border-[#2967CD] hover:text-[#003366]'}`}>{filter.label}</button>)}</div></div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">{filteredOffers.length ? filteredOffers.map((offer) => <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} key={offer.id} className="relative min-w-0 overflow-hidden rounded-[22px] border border-[#2967CD]/20 bg-white p-4 shadow-[0_14px_35px_-26px_rgba(0,51,102,0.4)] transition-shadow hover:shadow-[0_20px_42px_-25px_rgba(41,103,205,0.5)]">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#003366] via-[#2967CD] to-cyan-400" />
        <div className="flex flex-col gap-4">
          <div className="[&>div.mt-4.inline-flex]:hidden [&>p.mt-2]:hidden">
            <div className="flex min-w-0 items-start gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#2967CD]/20 bg-gradient-to-br from-[#e8f4ff] to-white text-[#003366] shadow-sm"><img src={offer.logo?.startsWith('http') ? offer.logo : imagenEmpresaPredeterminada} alt={offer.logo ? `Logo de ${offer.institution}` : `Imagen referencial de ${offer.institution}`} className="h-full w-full object-cover" /></div><div className="min-w-0"><div className="inline-flex items-center gap-1.5 rounded-full border border-[#2967CD]/15 bg-[#2967CD]/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#003366]"><Sparkles size={11} />{offer.type}</div><h4 className="mt-1.5 truncate text-base font-bold text-[#003366]" title={offer.institution}>{offer.institution}</h4><p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{offer.careers.join(' · ') || 'Sin carreras asignadas'}</p></div></div>
            <p className="mt-2 text-sm text-slate-600">{offer.careers.join(', ')} · {offer.filled}/{offer.vacancies} cupos · {offer.type}</p>
            <p className="mt-3 text-sm"><span className={`rounded-full px-3 py-1 ${expired(offer) ? 'bg-amber-100 text-amber-700' : offer.visible ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{expired(offer) ? 'Fuera de vigencia' : offer.visible ? 'Publicada' : 'Oculta'}</span></p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700"><CalendarDays size={16} className="text-[#2967CD]" /><span><span className="font-semibold text-[#003366]">Vigente hasta:</span> {offer.expiresAt ? toDate(offer.expiresAt).toLocaleDateString('es-BO', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Sin fecha registrada'}</span></div>
            <div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-2xl bg-[#f3f8ff] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"><UsersRound size={13} className="text-[#2967CD]" /> Cupos</p><p className="mt-1 text-lg font-black text-[#003366]"><span className={offer.filled >= offer.vacancies ? 'text-amber-600' : 'text-emerald-600'}>{Math.max(0, offer.vacancies - offer.filled)}</span> <span className="text-xs font-semibold text-slate-500">disponibles</span></p><p className="text-xs text-slate-500">{offer.filled}/{offer.vacancies} asignados</p></div><div className="rounded-2xl bg-[#f3f8ff] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"><CalendarDays size={13} className="text-[#2967CD]" /> Vigencia</p><p className="mt-1 text-sm font-bold leading-5 text-[#003366]">{offer.expiresAt ? toDate(offer.expiresAt).toLocaleDateString('es-BO', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Sin fecha'}</p><p className="text-xs text-slate-500">Vigente hasta</p></div></div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            <button onClick={() => edit(offer)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#003366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2967CD]"><PencilLine size={16} /> Editar</button>
            <button onClick={() => remove(offer)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"><Trash2 size={16} /> Eliminar</button>
          </div>
        </div>
      </motion.article>) : <p className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600 lg:col-span-2">No se encontraron empresas con ese criterio.</p>}</div>
    </div>
  </div>
}

function Field({ label, value, change, type = 'text', required = false, placeholder, description, textarea = false, max }: { label: string; value: string; change: (value: string) => void; type?: string; required?: boolean; placeholder?: string; description?: string; textarea?: boolean; max?: string }) {
  const [touched, setTouched] = useState(false)
  const error = required && !value.trim() ? `Completa ${label.toLowerCase()} para continuar.` : ''
  const inputClass = `w-full rounded-[18px] border bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#2967CD] focus:ring-4 focus:ring-[#2967CD]/15 ${touched && error ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 hover:border-sky-300'} `
  const update = (nextValue: string) => { setTouched(true); change(nextValue) }

  return <label className="block"><span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">{label}{required && <span className="text-red-500" aria-label="Obligatorio">*</span>}</span>{description && <p className="mb-2 text-xs leading-5 text-slate-500">{description}</p>}{textarea ? <textarea required={required} value={value} onBlur={() => setTouched(true)} onChange={(event) => update(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(touched && error)} aria-describedby={error ? `${label}-error` : undefined} className={`min-h-32 py-3 ${inputClass}`} /> : <input required={required} type={type} min={type === 'number' ? '0' : undefined} max={max} inputMode={type === 'number' ? 'numeric' : undefined} value={value} onBlur={() => setTouched(true)} onChange={(event) => update(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(touched && error)} aria-describedby={error ? `${label}-error` : undefined} className={`min-h-12 py-3.5 ${inputClass}`} />}{touched && error && <p id={`${label}-error`} className="mt-2 text-xs font-medium text-red-600" role="alert">{error}</p>}</label>
}

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

const toDate = (value: string) => {
  if (!value) return new Date()
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const toIsoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

function DateField({ label, value, onChange, description, minDate }: { label: string; value: string; onChange: (value: string) => void; description: string; minDate?: string }) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => toDate(value))
  const selectedDate = value ? toDate(value) : null
  const min = minDate ? toDate(minDate) : null
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const gridStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1 - ((firstDay.getDay() + 6) % 7))
  const today = toIsoDate(new Date())
  const years = Array.from({ length: 41 }, (_, index) => new Date().getFullYear() - 20 + index)

  useEffect(() => { if (value) setViewDate(toDate(value)) }, [value])

  const choose = (date: Date) => {
    if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return
    onChange(toIsoDate(date))
    setOpen(false)
  }

  const formattedValue = selectedDate ? selectedDate.toLocaleDateString('es-BO', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Seleccionar fecha'

  return <div className="relative"><span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><CalendarDays size={16} className="text-[#2967CD]" />{label}</span><p className="mb-2 text-xs leading-5 text-slate-500">{description}</p><button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className={`flex min-h-12 w-full items-center justify-between rounded-[18px] border bg-white px-4 py-3 text-left text-sm shadow-sm transition ${open ? 'border-[#2967CD] ring-4 ring-[#2967CD]/15' : 'border-slate-200 hover:border-sky-300'}`}><span className={selectedDate ? 'font-semibold text-[#003366]' : 'text-slate-400'}>{formattedValue}</span><CalendarDays size={19} className="text-[#2967CD]" /></button>{open && <div className="absolute z-30 mt-2 w-full min-w-[18rem] rounded-[22px] border border-sky-200 bg-white p-4 shadow-[0_20px_45px_rgba(0,51,102,0.2)]">
    <div className="mb-4 flex items-center justify-between gap-2"><button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} aria-label="Mes anterior" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#003366] transition hover:bg-sky-100"><ChevronLeft size={20} /></button><div className="flex min-w-0 gap-1.5"><select aria-label="Seleccionar mes" value={viewDate.getMonth()} onChange={(event) => setViewDate(new Date(viewDate.getFullYear(), Number(event.target.value), 1))} className="min-w-0 rounded-lg border border-sky-100 bg-sky-50 px-2 py-2 text-xs font-bold text-[#003366] outline-none focus:border-[#2967CD]">{MONTHS.map((month, index) => <option key={month} value={index}>{month}</option>)}</select><select aria-label="Seleccionar año" value={viewDate.getFullYear()} onChange={(event) => setViewDate(new Date(Number(event.target.value), viewDate.getMonth(), 1))} className="w-20 rounded-lg border border-sky-100 bg-sky-50 px-2 py-2 text-xs font-bold text-[#003366] outline-none focus:border-[#2967CD]">{years.map((year) => <option key={year} value={year}>{year}</option>)}</select></div><button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} aria-label="Mes siguiente" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#003366] transition hover:bg-sky-100"><ChevronRight size={20} /></button></div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs">{WEEKDAYS.map((day) => <span key={day} className="py-2 font-bold text-[#2967CD]">{day}</span>)}{Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index)
      const iso = toIsoDate(date)
      const inMonth = date.getMonth() === viewDate.getMonth()
      const disabled = Boolean(min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate()))
      const selected = iso === value
      return <button key={iso} type="button" disabled={disabled} onClick={() => choose(date)} className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl font-semibold transition ${selected ? 'bg-[#003366] text-white shadow-md' : iso === today ? 'border border-[#2967CD] text-[#2967CD]' : inMonth ? 'text-slate-700 hover:bg-sky-100' : 'text-slate-300'} disabled:cursor-not-allowed disabled:opacity-30`}>{date.getDate()}</button>
    })}</div>
    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold"><button type="button" onClick={() => { onChange(''); setOpen(false) }} className="rounded-lg px-2 py-2 text-slate-500 transition hover:bg-slate-100">Limpiar</button><button type="button" onClick={() => { const now = new Date(); setViewDate(now); choose(now) }} className="rounded-lg bg-sky-50 px-3 py-2 text-[#2967CD] transition hover:bg-sky-100">Hoy</button></div>
  </div>}</div>
}
export default Manage
