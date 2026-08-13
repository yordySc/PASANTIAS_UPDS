import { useEffect, useState } from 'react'
import { FileText, Link as LinkIcon, UploadCloud, Video } from 'lucide-react'
import type { CompanyOffer, Career, SuccessStory } from '../../types'
import { getCareers, addCareer, deleteCareer, getSuccessStories, saveSuccessStory, deleteSuccessStory, uploadSuccessStoryVideo } from '../../services/internships'

interface DashboardProps {
  offers: CompanyOffer[]
  refreshSuccessStories: () => Promise<void>
}

function Dashboard({ offers, refreshSuccessStories }: DashboardProps) {
  const visibleOffers = offers.filter((offer) => offer.visible)
  const filledOffers = offers.filter((offer) => !offer.visible || offer.filled >= offer.vacancies)
  const openVacancies = offers.reduce((sum, offer) => sum + Math.max(offer.vacancies - offer.filled, 0), 0)

  const [careers, setCareers] = useState<Career[]>([])
  const [loadingCareers, setLoadingCareers] = useState(false)
  const [newCareer, setNewCareer] = useState('')
  const [message, setMessage] = useState('')

  const [stories, setStories] = useState<SuccessStory[]>([])
  const [storyDraft, setStoryDraft] = useState<Omit<SuccessStory, 'id'>>({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '' })
  const [showResultField, setShowResultField] = useState(false)
  const [storyVideoFile, setStoryVideoFile] = useState<File | null>(null)
  const [loadingStories, setLoadingStories] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCareers(true)
        setCareers(await getCareers())
      } catch {
        setCareers([])
      } finally {
        setLoadingCareers(false)
      }
      try {
        setLoadingStories(true)
        setStories(await getSuccessStories())
      } catch {
        setStories([])
      } finally {
        setLoadingStories(false)
      }
    }
    void load()
  }, [])

  const handleAddCareer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addCareer(newCareer)
      setNewCareer('')
      setCareers(await getCareers())
      setMessage('Carrera agregada correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo agregar la carrera.')
    }
  }

  const handleDeleteCareer = async (id: string) => {
    if (!window.confirm('¿Eliminar esta carrera?')) return
    try {
      await deleteCareer(id)
      setCareers((all) => all.filter((c) => c.id !== id))
      setMessage('Carrera eliminada.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo eliminar la carrera.')
    }
  }

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const videoUrl = storyVideoFile ? await uploadSuccessStoryVideo(storyVideoFile) : storyDraft.videoUrl
      const created = await saveSuccessStory({ ...storyDraft, videoUrl })
      setStories((all) => [created, ...all])
      setStoryDraft({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '' })
      setStoryVideoFile(null)
      await refreshSuccessStories()
      setMessage('Caso de éxito agregado correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo guardar el caso de éxito.')
    }
  }

  const handleDeleteStory = async (id: string) => {
    if (!window.confirm('¿Eliminar este caso de éxito?')) return
    try {
      await deleteSuccessStory(id)
      setStories((all) => all.filter((s) => s.id !== id))
      await refreshSuccessStories()
      setMessage('Caso de éxito eliminado.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo eliminar el caso de éxito.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Resumen general</p>
        <h2 className="text-3xl font-semibold text-slate-900">Consulta rápida de prácticas, cupos y carreras</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">Esta sección está pensada para ver de forma simple y clara qué está activo, cuántos cupos siguen disponibles y qué carreras se están gestionando.</p>
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

      {message && <p className="rounded-[12px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Carreras disponibles</h3>
          <p className="mt-2 text-sm text-slate-600">Gestiona las carreras que aparecen en el filtro del home.</p>
          <form onSubmit={handleAddCareer} className="mt-4 flex gap-3">
            <input value={newCareer} onChange={(e) => setNewCareer(e.target.value)} placeholder="Ej. Ingeniería de Sistemas" className="flex-1 rounded-[12px] border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
            <button type="submit" className="rounded-full bg-[#223b87] px-4 py-2 text-sm font-semibold text-white">Agregar</button>
          </form>
          <div className="mt-4 space-y-3">
            {loadingCareers ? <p className="text-sm text-slate-500">Cargando carreras…</p> : careers.map((career) => (
              <div key={career.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-2">
                <span className="text-sm font-medium text-slate-700">{career.name}</span>
                <button onClick={() => handleDeleteCareer(career.id)} className="text-sm font-semibold text-red-600">Eliminar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Casos de éxito</h3>
          <p className="mt-2 text-sm text-slate-600">Añade experiencias que se mostrarán en la página pública.</p>
          <form onSubmit={handleSaveStory} className="mt-4 space-y-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#223b87] text-white"><FileText size={17} /></span><div><p className="text-sm font-semibold text-slate-800">Contenido del caso</p><p className="text-xs text-slate-500">Completa los datos que verán los estudiantes. <strong className="text-[#223b87]">Nota:</strong> la carga de video requiere que Supabase esté configurado (tabla y storage). Si no lo está, solo se guardará el texto.</p></div></div>
            <input value={storyDraft.title} onChange={(e) => setStoryDraft({ ...storyDraft, title: e.target.value })} placeholder="Título" className="w-full rounded-[12px] border border-[#cfe8ff] bg-[#f3f8ff] px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
            <input value={storyDraft.institution} onChange={(e) => setStoryDraft({ ...storyDraft, institution: e.target.value })} placeholder="Empresa / institución (donde se realizó la pasantía)" className="w-full rounded-[12px] border border-[#cfe8ff] bg-[#f3f8ff] px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
            <div className="flex items-center gap-3">
              <input id="showResult" type="checkbox" checked={showResultField} onChange={(e) => setShowResultField(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#223b87]" />
              <label htmlFor="showResult" className="text-sm text-slate-700">Agregar campo "Resultado" (opcional)</label>
            </div>
            {showResultField && (
              <input value={storyDraft.highlight} onChange={(e) => setStoryDraft({ ...storyDraft, highlight: e.target.value })} placeholder="Resultado (ej. Desarrollo profesional, Contratación parcial)" className="w-full rounded-[12px] border border-[#cfe8ff] bg-[#f3f8ff] px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
            )}
            <textarea value={storyDraft.description} onChange={(e) => setStoryDraft({ ...storyDraft, description: e.target.value })} rows={3} placeholder="Descripción" className="w-full rounded-[12px] border border-[#cfe8ff] bg-[#f3f8ff] px-4 py-3 text-sm outline-none focus:border-[#0085fc]" />
            <label className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-dashed border-[#0085fc]/50 bg-[#f3f8ff] px-4 py-4 text-sm text-slate-700 transition hover:bg-[#e8f4ff]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0085fc] text-white"><UploadCloud size={19} /></span><span><span className="flex items-center gap-2 font-semibold text-slate-800"><Video size={16} /> Cargar video</span><span className="mt-1 block text-xs text-slate-600">MP4 o WebM. {storyVideoFile?.name || (isSupabaseConfigured ? 'Selecciona un archivo desde tu equipo.' : 'Requiere Supabase configurado para subir videos.')}</span></span>
              <input type="file" accept="video/*" onChange={(e) => setStoryVideoFile(e.target.files?.[0] || null)} className="sr-only" disabled={!isSupabaseConfigured} />
            </label>
            <div className="flex gap-3"><button type="submit" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Agregar caso</button></div>
          </form>

          <div className="mt-4 space-y-3">
            {loadingStories ? <p className="text-sm text-slate-500">Cargando…</p> : stories.map((s) => (
              <div key={s.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    {s.videoUrl && <p className="mt-1 text-xs font-medium text-[#0085fc]">Video adjunto</p>}
                  </div>
                  <button onClick={() => handleDeleteStory(s.id)} className="text-sm font-semibold text-red-600">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
