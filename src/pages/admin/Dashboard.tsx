import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { FileText, Link as LinkIcon, UploadCloud, Video } from 'lucide-react'
import type { CompanyOffer, Career, SuccessStory } from '../../types'
import { getCareers, addCareer, deleteCareer, getSuccessStories, saveSuccessStory, deleteSuccessStory, uploadSuccessStoryVideo, updateSuccessStory } from '../../services/internships'
import { isSupabaseConfigured } from '../../lib/supabase'

interface DashboardProps {
  offers: CompanyOffer[]
  refreshSuccessStories: () => Promise<void>
}

function Dashboard({ offers, refreshSuccessStories }: DashboardProps) {
  const visibleOffers = offers.filter((offer) => offer.visible)
  const filledOffers = offers.filter((offer) => !offer.visible || offer.filled >= offer.vacancies)
  const openVacancies = offers.reduce((sum, offer) => sum + Math.max(offer.vacancies - offer.filled, 0), 0)
  const companiesCount = Array.from(new Set(offers.map((o) => o.companyId))).length

  const [careers, setCareers] = useState<Career[]>([])
  const [loadingCareers, setLoadingCareers] = useState(false)
  const [newCareer, setNewCareer] = useState('')
  const [message, setMessage] = useState('')

  const [stories, setStories] = useState<SuccessStory[]>([])
  const [storyDraft, setStoryDraft] = useState<Omit<SuccessStory, 'id'>>({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '' })
  const [showResultField, setShowResultField] = useState(false)
  const [storyVideoFile, setStoryVideoFile] = useState<File | null>(null)
  const [loadingStories, setLoadingStories] = useState(false)
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; kind?: 'info' | 'success' | 'error' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const uploadTimerRef = useRef<number | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{ open: boolean; title?: string; body?: string; onConfirm?: () => Promise<void> }>({ open: false })

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
      setToast({ message: 'Carrera agregada correctamente.', kind: 'success' })
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'No se pudo agregar la carrera.', kind: 'error' })
    }
  }

  const handleDeleteCareer = (id: string, name?: string) => {
    setConfirm({
      open: true,
      title: 'Eliminar carrera',
      body: `¿Eliminar la carrera "${name ?? ''}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setConfirm({ open: false })
        try {
          await deleteCareer(id)
          setCareers((all) => all.filter((c) => c.id !== id))
          setToast({ message: 'Carrera eliminada correctamente.', kind: 'success' })
        } catch (err) {
          setToast({ message: err instanceof Error ? err.message : 'No se pudo eliminar la carrera.', kind: 'error' })
        }
      },
    })
  }

  useEffect(() => {
    if (storyVideoFile) {
      const url = URL.createObjectURL(storyVideoFile)
      setVideoPreviewUrl(url)
      return () => { URL.revokeObjectURL(url); setVideoPreviewUrl(null) }
    }
    setVideoPreviewUrl(null)
  }, [storyVideoFile])

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault()
    // front validation: require title, description and institution
    if (!storyDraft.title.trim() || !storyDraft.description.trim() || !storyDraft.institution.trim()) {
      setToast({ message: 'Completa título, descripción y empresa/institución antes de guardar.', kind: 'error' })
      return
    }
    setSaving(true)
    try {
      let videoUrl = storyDraft.videoUrl
      if (storyVideoFile) {
        setIsUploading(true)
        setUploadProgress(3)
        setToast({ message: 'Subiendo video...', kind: 'info' })
        // fake progress animation while upload runs
        uploadTimerRef.current = window.setInterval(() => {
          setUploadProgress((p) => {
            if (p === null) return 3
            const next = Math.min(85, p + Math.floor(Math.random() * 8) + 1)
            return next
          })
        }, 400)
        try {
          const result = await uploadSuccessStoryVideo(storyVideoFile)
          // upload finished
          const publicUrl = result.publicUrl
          const path = result.path
          videoUrl = publicUrl
          setUploadProgress(100)
          setStoryDraft((d) => ({ ...d, videoUrl: publicUrl }))
          // try downloading via Supabase storage API to create a blob URL for preview (avoids CDN/CORS audio issues)
          try {
            const { data: downloaded, error: dlErr } = await supabase.storage.from('success-story-videos').download(path)
            if (!dlErr && downloaded) {
              const blob = await downloaded.arrayBuffer()
              const b = new Blob([blob], { type: storyVideoFile.type })
              const blobUrl = URL.createObjectURL(b)
              setVideoPreviewUrl(blobUrl)
            } else {
              setVideoPreviewUrl(publicUrl)
            }
          } catch (e) {
            setVideoPreviewUrl(publicUrl)
          }
          setToast({ message: 'Video subido correctamente.', kind: 'success' })
        } finally {
          if (uploadTimerRef.current) { clearInterval(uploadTimerRef.current); uploadTimerRef.current = null }
          setTimeout(() => setUploadProgress(null), 700)
          setIsUploading(false)
        }
      }
      if (editingStoryId) {
        const updated = await updateSuccessStory(editingStoryId, { ...storyDraft, videoUrl })
        setStories((all) => all.map((s) => s.id === updated.id ? updated : s))
        setToast({ message: 'Caso de éxito actualizado correctamente.', kind: 'success' })
      } else {
        const created = await saveSuccessStory({ ...storyDraft, videoUrl })
        setStories((all) => [created, ...all])
        setToast({ message: 'Caso de éxito agregado correctamente.', kind: 'success' })
      }
      setStoryDraft({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '' })
      setStoryVideoFile(null)
      setEditingStoryId(null)
      await refreshSuccessStories()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo guardar el caso de éxito.'
      setToast({ message: msg, kind: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteStory = (id: string, title?: string) => {
    setConfirm({
      open: true,
      title: 'Eliminar caso de éxito',
      body: `¿Eliminar el caso "${title ?? ''}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setConfirm({ open: false })
        setDeletingId(id)
        try {
          await deleteSuccessStory(id)
          setStories((all) => all.filter((s) => s.id !== id))
          await refreshSuccessStories()
          setToast({ message: 'Caso de éxito eliminado.', kind: 'success' })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'No se pudo eliminar el caso de éxito.'
          console.error('deleteSuccessStory error', err)
          setToast({ message: msg, kind: 'error' })
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  const handleEditStory = (s: SuccessStory) => {
    setEditingStoryId(s.id)
    setStoryDraft({ title: s.title, description: s.description, institution: s.institution || '', highlight: s.highlight || '', accent: s.accent || 'blue', videoUrl: s.videoUrl || '' })
    setShowResultField(Boolean(s.highlight))
    // avoid forcing a page scroll when editing; user can see the form at top
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Resumen general</p>
        <h2 className="text-3xl font-semibold text-slate-900">Consulta rápida de prácticas, cupos y carreras</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">Esta sección está pensada para ver de forma simple y clara qué está activo, cuántos cupos siguen disponibles y qué carreras se están gestionando.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Empresas registradas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{companiesCount}</p>
          <p className="mt-2 text-xs text-slate-500">Total de empresas con al menos una oferta registrada</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Ofertas activas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{visibleOffers.length}</p>
          <p className="mt-2 text-xs text-slate-500">Ofertas visibles para estudiantes</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Cupos abiertos</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{openVacancies}</p>
          <p className="mt-2 text-xs text-slate-500">Suma de vacantes disponibles</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Solicitudes cerradas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{filledOffers.length}</p>
          <p className="mt-2 text-xs text-slate-500">Ofertas ya completadas o no visibles</p>
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
                <div className="flex gap-2">
                  <button onClick={() => { setNewCareer(career.name); }} title="Editar nombre" className="inline-flex items-center gap-2 rounded-md bg-[#0085fc] px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Editar</button>
                  <button onClick={() => handleDeleteCareer(career.id)} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Casos de éxito</h3>
          <p className="mt-2 text-sm text-slate-600">Añade experiencias que se mostrarán en la página pública.</p>
          <form onSubmit={handleSaveStory} className="mt-4 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#223b87] text-white"><FileText size={17} /></span><div><p className="text-sm font-semibold text-slate-800">Contenido del caso</p></div></div>
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
            {videoPreviewUrl && (
              <div className="mt-2 overflow-hidden rounded-md border border-slate-200">
                <video controls preload="metadata" className="block aspect-video w-full" src={videoPreviewUrl}>
                  Tu navegador no soporta video.
                </video>
              </div>
            )}
            {isUploading && (
              <div className="mt-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div style={{ width: `${uploadProgress ?? 10}%` }} className="h-full rounded-full bg-[#0085fc] transition-all duration-300" />
                </div>
                <p className="mt-2 text-xs text-slate-600">Subiendo video… espera hasta que finalice antes de publicar.</p>
              </div>
            )}
            <div className="flex gap-3"><button type="submit" disabled={saving || isUploading} className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${saving || isUploading ? 'bg-slate-400' : 'bg-emerald-600'}`}>{editingStoryId ? 'Guardar cambios' : 'Agregar caso'}</button></div>
          </form>

          <div className="mt-4 space-y-3">
            {loadingStories ? <p className="text-sm text-slate-500">Cargando…</p> : stories.map((s) => (
              <div key={s.id} className="rounded-md border border-[#cfe8ff] bg-[#f9fbff] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    {s.videoUrl && <p className="mt-1 text-xs font-medium text-[#0085fc]">Video adjunto</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditStory(s)} className="inline-flex items-center gap-2 rounded-md bg-[#223b87] px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Editar</button>
                    <button onClick={() => handleDeleteStory(s.id)} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && (
        <div>
          {/* lazy-load toast component to avoid circular deps */}
          <div className="fixed right-6 top-6 z-50">
            <div className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${toast.kind === 'success' ? 'bg-emerald-600' : toast.kind === 'error' ? 'bg-red-600' : 'bg-sky-600'}`}>{toast.message}</div>
          </div>
        </div>
      )}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirm({ open: false })} />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900">{confirm.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{confirm.body}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setConfirm({ open: false })} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancelar</button>
              <button onClick={async () => { if (confirm.onConfirm) await confirm.onConfirm(); }} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
